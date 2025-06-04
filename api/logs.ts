import ILog from '@/models/ILog'
import {documentData, getCollectionRef, getDataFromQuerySnapshot, getDocumentRef} from '@/api/firestoreUtils'
import {useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult} from '@tanstack/react-query'
import {getCurrentUser} from './auth'
import {getDoc} from '@react-native-firebase/firestore'
import useUser from '@/hooks/useUser'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export const useGetLogs = (): UseQueryResult<ILog[], Error> => {
  const user = useUser()
  return useQuery({
    queryKey: ['logs', user?.uid],
    queryFn: getLogs,
    enabled: !!user, // Only run the query if user is logged in
  })
}

export const useGetLog = (id: string): UseQueryResult<ILog, Error> => {
  return useQuery({
    queryKey: ['logs', id],
    queryFn: () => getLog(id),
    enabled: !!id, // Only run the query if id is provided
  })
}

export const useAddLog = (): UseMutationResult<ILog, Error, AddLogParams, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: addLog,
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['logs']})
    },
  })
}

export const useDeleteLog = (): UseMutationResult<void, Error, string, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: deleteLog,
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['logs']})
    },
  })
}

export const useUpdateLog = (): UseMutationResult<ILog, Error, ILog & {id: string}, void> => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: updateLog,
    onSettled: async () => {
      await queryClient.invalidateQueries({queryKey: ['logs']})
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

const getLogs = async (): Promise<ILog[]> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  const querySnapshot = await getCollectionRef<ILog>('logs').where('userId', '==', user.uid).orderBy('date', 'desc').get()
  return getDataFromQuerySnapshot(querySnapshot, 'id')
}

const getLog = async (id: string): Promise<ILog> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  const log = await documentData<ILog>('logs', id, 'id')
  if (!log) {
    throw new Error('Log not found')
  }

  if (log.userId !== user.uid) {
    throw new Error('Log does not belong to the user')
  }

  return log as ILog
}

interface AddLogParams {
  bodypart: string
  complaint: string
  extraInformation: string | null
  pain: number
  date: Date
}

const addLog = async ({bodypart, complaint, pain, extraInformation, date}: AddLogParams): Promise<ILog> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  const docRef = await getCollectionRef<ILog>('logs').add({
    bodypart,
    complaint,
    pain,
    extraInformation,
    date,
    userId: user.uid,
  })

  const log = await documentData<ILog>('logs', docRef.id, 'id')
  return log as ILog
}

const deleteLog = async (id: string): Promise<void> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  // Ensure the log belongs to the user
  const log = await documentData<ILog>('logs', id, 'id')
  if (!log || log.userId !== user.uid) {
    throw new Error('Log not found or does not belong to the user')
  }

  await getDocumentRef<ILog>('logs', id).delete()
}

const updateLog = async (log: ILog & {id: string}): Promise<ILog> => {
  const user = getCurrentUser()
  if (!user) {
    throw new Error('User not logged in')
  }

  // Fetch the existing log to ensure ownership
  const existingLog = await documentData<ILog>('logs', log.id, 'id')
  if (!existingLog) {
    throw new Error('Log not found')
  }
  if (existingLog.userId !== user.uid) {
    throw new Error('You do not have permission to update this log')
  }

  // Only allow updating fields, not userId
  const { id, userId, ...updatableFields } = log

  await getDocumentRef<ILog>('logs', log.id).update(updatableFields)
  const updatedLog = await documentData<ILog>('logs', log.id, 'id')
  return updatedLog as ILog
}

//endregion
