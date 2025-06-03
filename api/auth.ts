import {useMutation, UseMutationResult, useQuery, useQueryClient} from '@tanstack/react-query'
import auth from '@react-native-firebase/auth'
import {GoogleSignin} from '@react-native-google-signin/google-signin'
import {AuthCredential, User} from '@/models/firebaseTypes'

//region Mutations & queries

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          MUTATIONS & QUERIES
 * ---------------------------------------------------------------------------------------------------------------------
 */

export function useSignOut(): UseMutationResult<void, Error, void, void> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signOut,
    onSettled: () => queryClient.invalidateQueries({queryKey: ['currentUser']}),
  })
}

export function useSignIn(): UseMutationResult<User | null, Error, SignInParams, void> {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: signIn,
    onSettled: () => queryClient.invalidateQueries({queryKey: ['currentUser']}),
  })
}

export function useGetCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    // Aangezien de gebruiker nooit kan wijzigen tenzij de gebruiker uitlogt, kunnen we de staleTime en cacheTime op
    // Infinity zetten.
    gcTime: Infinity,
    staleTime: Infinity,
  })
}

//endregion

//region API functions

/**
 * ---------------------------------------------------------------------------------------------------------------------
 *                                          API functions
 * ---------------------------------------------------------------------------------------------------------------------
 */

export enum AuthProvider {
  GOOGLE = 'google.com',
}

interface SignInParams {
  provider: AuthProvider
}

async function signIn({provider}: SignInParams): Promise<User | null> {
  let credential: AuthCredential | null = null
  switch (provider) { 
    case AuthProvider.GOOGLE:
      credential = await createGoogleCredential()
      console.log("cred: ", credential)
      break
    default:
      throw new Error('Invalid provider')
  }

  if (!credential) return null

  const userCredential = await auth().signInWithCredential(credential)
  return userCredential.user
}

async function signOut(): Promise<void> {
  const user = getCurrentUser()

  if (user === null) {
    return
  }

  // Log uit bij Firebase.
  await auth().signOut()

  // Log uit bij de Identity Provider.
  switch (user.providerData[0].providerId) {
    case AuthProvider.GOOGLE.toString():
      await GoogleSignin.signOut()
      break
    default:
      throw new Error('Invalid provider')
  }
}

GoogleSignin.configure({webClientId: process.env.EXPO_PUBLIC_WEB_CLIENT_ID})

async function createGoogleCredential(): Promise<AuthCredential | null> {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true})
  console.log("test")
  // Get the users ID token
  const signInResult = await GoogleSignin.signIn()
  console.log("result")
  console.log(signInResult)
  
  // Retrieve the ID Token
  const idToken = signInResult.data?.idToken

  if (!idToken) {
    throw new Error('No ID token found')
  }

  // Create a Google credential with the token
  return auth.GoogleAuthProvider.credential(idToken)
}

export function getCurrentUser(): User | null {
  return auth().currentUser
}

//endregion
