import {useAddLog, useGetLog, useUpdateLog} from '@/api/logs'
import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import StyledText from '@/components/styledText'
import {View} from 'react-native'
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
  const {data: log} = useGetLog(id ?? '')

  const [bodypart, setBodypart] = useState('')
  const [complaint, setComplaint] = useState('')
  const [extraInformation, setExtraInformation] = useState('')
  const [pain, setPain] = useState(0)
  const [date, setDate] = useState(new Date())

  const [showDP, setShowDP] = useState(false)
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
      setPain(log.pain ?? 0)
      setDate(toDateObj(log.date))
    }
  }, [log])

  const handleCreateUpdateLog = () => {
    if (!bodypart || !complaint || pain < 0 || pain > 10 || !date) {
      alert('Please fill in all required fields correctly.')
      return
    }
    if (id) {
      updateLog({
        id,
        bodypart,
        complaint,
        extraInformation: extraInformation || null,
        pain,
        date,
      })
    } else {
      addLog({
        bodypart,
        complaint,
        extraInformation: extraInformation || null,
        pain,
        date,
      })
    }
    router.back()
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
          <StyledText style={styles.inputText}>Pain Level *</StyledText>
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
            <TextareaInput style={{textAlignVertical: 'top'}} placeholder="Extra information about you complaint..." />
          </Textarea>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 20}}>
          <Button onPress={handleCreateUpdateLog}>
            <ButtonText>{id ? 'Update log' : 'Add log'}</ButtonText>
          </Button>
          <Button
            onPress={router.back}
            variant="outline"
            style={[styles.button, {backgroundColor: colors.card, borderColor: colors.border}]}>
            <ButtonText>Cancel</ButtonText>
          </Button>
        </View>
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
