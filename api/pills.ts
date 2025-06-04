import IPill from '@/models/IPill'
import {documentData, getCollectionRef, getDataFromQuerySnapshot, getDocumentRef} from '@/api/firestoreUtils'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import {getCurrentUser} from './auth'
import useUser from '@/hooks/useUser'
import IDaysOfWeek from '@/models/IDaysOfWeek'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetPills = (): UseQueryResult<IPill[], Error> => {
  const user = useUser()
  return useQuery({
    queryKey: ['pills', user?.uid],
    queryFn: getPills,
    enabled: !!user, // Only run the query if user is logged in
  })
}

export const useGetPill = (id: string): UseQueryResult<IPill, Error> => {
  return useQuery({
    queryKey: ['pills', id],
    queryFn: () => getPill(id),
    enabled: !!id, // Only run the query if id is provided
  })
}

export const useAddPill = (): UseMutationResult<IPill, Error, AddPillParams, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addPill,
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['pills']})
    },
  })
}

export const useDeletePill = (): UseMutationResult<void, Error, string, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deletePill,
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['pills']})
    },
  })
}

export const useUpdatePill = (): UseMutationResult<IPill, Error, IPill & {id: string}, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updatePill,
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['pills']})
    },
  })
}

//endregion

//region API functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

const getPills = async (): Promise<IPill[]> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  const querySnapshot = await getCollectionRef<IPill>('pills').where('userId', '==', user.uid).orderBy('date, duration', 'asc').get()
  return getDataFromQuerySnapshot(querySnapshot, 'id')
}

const getPill = async (id: string): Promise<IPill> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  const pill = await documentData<IPill>('pills', id, 'id')
  if (!pill) {
    throw new Error('Pill not found')
  }

  if (pill.userId !== user.uid) {
    throw new Error('Pill does not belong to the user')
  }

  return pill as IPill
}

interface AddPillParams {
  name: string
  description: string
  duration?: number // in days
  moment?: Date[]
  days: IDaysOfWeek // days of the week when the pill should be taken
  imageUrl?: string // URL of the pill image
  date: Date // start date for the pill
}

const addPill = async ({name, description, duration, moment, days, imageUrl, date}: AddPillParams): Promise<IPill> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  const docRef = await getCollectionRef<IPill>('pills').add({
    name,
    description,
    duration,
    moment,
    days,
    date,
    imageUrl,
    userId: user.uid,
  })

  const pill = await documentData<IPill>('pills', docRef.id, 'id')
  return pill as IPill
}

const deletePill = async (id: string): Promise<void> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  // Ensure the pill belongs to the user
  const pill = await documentData<IPill>('pills', id, 'id')
  if (!pill || pill.userId !== user.uid) {
    throw new Error('Pill not found or does not belong to the user')
  }

  await getDocumentRef<IPill>('pills', id).delete()
}

const updatePill = async (pill: IPill & {id: string}): Promise<IPill> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  // Fetch the existing pill to ensure ownership
  const existingPill = await documentData<IPill>('pills', pill.id, 'id')
  if (!existingPill) {
    throw new Error('Pill not found')
  }
  if (existingPill.userId !== user.uid) {
    throw new Error('You do not have permission to update this pill')
  }

  // Only allow updating fields, not userId
  const { id, userId, ...updatableFields } = pill

  await getDocumentRef<IPill>('pills', pill.id).update(updatableFields)
  const updatedPill = await documentData<IPill>('pills', pill.id, 'id')
  return updatedPill as IPill
}

//endregion
