import {useAddLog, useGetLog, useUpdateLog, useDeleteLog} from '@/api/logs'
import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import StyledText from '@/components/styledText'
import {View, ActivityIndicator} from 'react-native'
import {Button, ButtonText} from '@/components/ui/button'
import {Input, InputField} from '@/components/ui/input'
import {useRouter} from 'expo-router'
import {toDateObj} from '@/utils/dateStringToDateObj'
import {Textarea, TextareaInput} from '@/components/ui/textarea'
import {FontAwesome5} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import {StyleSheet} from 'react-native'
import {ThemeContext} from '@/context/themeProvider'

interface logFormProps {
  id?: string
}

const LogForm: FunctionComponent<logFormProps> = ({id}) => {
  const {colors} = useContext(ThemeContext)

  const {mutate: addLog} = useAddLog()
  const {mutate: updateLog} = useUpdateLog()
  const {mutate: deleteLog} = useDeleteLog()
  const {data: log} = useGetLog(id ?? '')

  const [bodypart, setBodypart] = useState('')
  const [complaint, setComplaint] = useState('')
  const [extraInformation, setExtraInformation] = useState('')
  const [pain, setPain] = useState(1)
  const [date, setDate] = useState(new Date())

  const [showDP, setShowDP] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const onChangeDP = (event: any, selectedDate?: Date) => {
    setShowDP(false)
    if (selectedDate) {
      setDate(selectedDate)
    }
  }

  const showDatepicker = () => {
    setShowDP(true)
  }

  useEffect(() => {
    if (log) {
      setBodypart(log.bodypart ?? '')
      setComplaint(log.complaint ?? '')
      setExtraInformation(log.extraInformation ?? '')
      setPain(log.pain ?? 1)
      setDate(toDateObj(log.date))
    }
  }, [log])

  const handleCreateUpdateLog = async () => {
    const errors: string[] = []

    if (!bodypart.trim()) errors.push('Bodypart is required.')
    if (!complaint.trim()) errors.push('Complaint is required.')
    if (isNaN(pain) || pain < 1 || pain > 10) errors.push('Pain must be a number between 1 and 10.')
    if (!date || isNaN(date.getTime())) errors.push('Date is required.')
    if (date && date > new Date()) errors.push('Date cannot be in the future.')

    if (errors.length > 0) {
      alert(errors.join('\n'))
      return
    }

    setIsSaving(true)
    if (id) {
      updateLog(
        {
          id,
          bodypart,
          complaint,
          extraInformation: extraInformation || null,
          pain,
          date,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              setIsSaving(false)
              router.back()
            }, 1000)
          },
          onError: () => setIsSaving(false),
        }
      )
    } else {
      addLog(
        {
          bodypart,
          complaint,
          extraInformation: extraInformation || null,
          pain,
          date,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              setIsSaving(false)
              router.back()
            }, 1000)
          },
          onError: () => setIsSaving(false),
        }
      )
    }
  }

  const handleDeleteLog = async () => {
    if (!id) return
    setIsDeleting(true)
    try {
      deleteLog(id, {
        onSuccess: () => router.back(),
      })
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <>
      <StyledText style={styles.title} className="text-center">
        {id ? 'Update log' : 'Create log'}
      </StyledText>
      <View style={{gap: 16}} className="p-4">
        <View>
          <StyledText style={styles.inputText}>Bodypart *</StyledText>
          <Input>
            <InputField value={bodypart} onChangeText={setBodypart} placeholder="Bodypart" />
          </Input>
        </View>
        <View>
          <StyledText style={styles.inputText}>Complaint *</StyledText>
          <Input>
            <InputField value={complaint} onChangeText={setComplaint} placeholder="Complaint" />
          </Input>
        </View>
        <View>
          <StyledText style={styles.inputText}>Pain Level (between 0 and 10) *</StyledText>
          <Input>
            <InputField
              value={pain.toString()}
              onChangeText={val => setPain(Number(val))}
              placeholder="Pain"
              keyboardType="numeric"
              maxLength={2}
            />
          </Input>
        </View>
        <View>
          <StyledText style={styles.inputText}>Date of complaint *</StyledText>
          <View style={{flexDirection: 'row', alignItems: 'flex-start', gap: 8}}>
            <Button
              variant="outline"
              onPress={showDatepicker}
              style={[styles.button, {backgroundColor: colors.background, borderColor: colors.border}]}>
              <FontAwesome5 name="calendar-alt" size={20} />
            </Button>
            <Input style={{flex: 1}}>
              <InputField value={date.toLocaleDateString('en-GB')} placeholder="Select date" editable={false} />
            </Input>
          </View>
        </View>
        {showDP && <DateTimePicker value={date} mode="date" is24Hour={true} display="default" onChange={onChangeDP} />}
        <View>
          <StyledText style={styles.inputText}>Extra Information</StyledText>
          <Textarea size="md">
            <TextareaInput
              style={{textAlignVertical: 'top'}}
              value={extraInformation}
              onChangeText={setExtraInformation}
              placeholder="Extra information about you complaint..."
            />
          </Textarea>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 20}}>
          <Button onPress={handleCreateUpdateLog} disabled={isSaving || isDeleting}>
            {isSaving ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ButtonText>{id ? 'Update log' : 'Add log'}</ButtonText>
            )}
          </Button>
          <Button
            onPress={router.back}
            variant="outline"
            style={[styles.button, {backgroundColor: colors.card, borderColor: colors.border}]}
            disabled={isSaving || isDeleting}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </View>
        {id && (
          <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 10}}>
            <Button
              onPress={handleDeleteLog}
              variant="outline"
              style={[styles.button, {backgroundColor: '#ef4444', borderColor: '#b91c1c'}]}
              disabled={isDeleting || isSaving}>
              {isDeleting ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonText style={{color: '#fff'}}>Delete</ButtonText>
              )}
            </Button>
          </View>
        )}
      </View>
    </>
  )
}

export default LogForm

const styles = StyleSheet.create({
  title: {fontSize: 24, fontWeight: 'bold'},
  inputText: {fontSize: 16, fontWeight: 'normal', marginBottom: 4},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
