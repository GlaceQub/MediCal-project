import {useAddPill, useGetPill, useUpdatePill} from '@/api/pills'
import React, {FunctionComponent, useContext, useEffect, useState} from 'react'
import StyledText from '@/components/styledText'
import {useWindowDimensions, View} from 'react-native'
import {Button, ButtonText} from '@/components/ui/button'
import {Input, InputField} from '@/components/ui/input'
import {useRouter} from 'expo-router'
import {toDateObj} from '@/utils/dateStringToDateObj'
import {FontAwesome5} from '@expo/vector-icons'
import DateTimePicker from '@react-native-community/datetimepicker'
import {StyleSheet} from 'react-native'
import {ThemeContext} from '@/context/themeProvider'
import IDaysOfWeek from '@/models/IDaysOfWeek'
import {Checkbox, CheckboxIcon, CheckboxIndicator, CheckboxLabel} from '../ui/checkbox'
import {CheckIcon} from '../ui/icon'
import getDayAbbreviation from '@/utils/dayAbbriviation'

interface pillFormProps {
  id?: string
}

const PillForm: FunctionComponent<pillFormProps> = ({id}) => {
  const {width} = useWindowDimensions()
  const {colors} = useContext(ThemeContext)

  const {mutate: addPill} = useAddPill()
  const {mutate: updatePill} = useUpdatePill()
  const {data: pill} = useGetPill(id ?? '')

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [duration, setDuration] = useState<number>(0) // default duration of 0 days (always)
  const [date, setDate] = useState<Date>(new Date()) // default to current date
  const [moments, setMoments] = useState<{hour: number, minute: number}[]>([])
  const [imageUrl, setImageUrl] = useState<string>('')
  const [days, setDays] = useState<IDaysOfWeek>({
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  })

  const [showDP, setShowDP] = useState(false)
  const [mode, setModeDP] = useState<'date' | 'time'>('date')
  const router = useRouter()

  const onChangeDP = (event: any, selectedDate?: Date) => {
    setShowDP(false)
    if (mode === 'time' && selectedDate) {
      setMoments(prev => [
        ...prev,
        { hour: selectedDate.getHours(), minute: selectedDate.getMinutes() }
      ])
    } else if (mode === 'date' && selectedDate) {
      setDate(selectedDate)
    }
  }

  const showModeDP = (currentMode: 'date' | 'time') => {
    setShowDP(true)
    setModeDP(currentMode)
  }

  const showDatepicker = () => {
    showModeDP('date')
  }

  const showTimepicker = () => {
    showModeDP('time')
  }

  useEffect(() => {
    if (pill) {
      setName(pill.name ?? '')
      setDescription(pill.description ?? '')
      setDuration(pill.duration ?? 0)
      setDate(toDateObj(pill.date))
      setMoments(
        pill.moments
          ? pill.moments.map((m: any) =>
              typeof m === 'string'
                ? { hour: Number(m.split(':')[0]), minute: Number(m.split(':')[1]) }
                : m
            )
          : []
      )
      setImageUrl(pill.imageUrl ?? '')
      setDays(
        pill.days ?? {
          monday: false,
          tuesday: false,
          wednesday: false,
          thursday: false,
          friday: false,
          saturday: false,
          sunday: false,
        },
      )
    }
  }, [pill])

  const handleCreateUpdatePill = () => {
    // Check required fields and at least one day selected
    const atLeastOneDay = Object.values(days).some(Boolean)
    if (!name || !description || moments.length === 0 || !atLeastOneDay || !date) {
      alert('Please fill in all required fields and select at least one day.')
      return
    }

    if (id) {
      updatePill({
        id,
        name,
        description,
        duration,
        date,
        moments,
        days,
        imageUrl,
      })
    } else {
      addPill({
        name,
        description,
        duration,
        date,
        moments,
        days,
        imageUrl,
      })
    }
    router.back()
  }

  const daysOfWeek: Array<keyof IDaysOfWeek> = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ]

  return (
    <>
      <StyledText style={styles.title} className="text-center">
        {id ? 'Update medication' : 'Create medication'}
      </StyledText>
      <View style={{gap: 16}} className="p-4">
        <View>
          <StyledText style={styles.inputText}>Name *</StyledText>
          <Input>
            <InputField value={name} onChangeText={setName} placeholder="name of medication" />
          </Input>
        </View>
        <View>
          <StyledText style={styles.inputText}>Description *</StyledText>
          <Input>
            <InputField value={description} onChangeText={setDescription} placeholder="description of medication" />
          </Input>
        </View>
        <View>
          <StyledText style={styles.inputText}>Start date *</StyledText>
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
        {showDP && <DateTimePicker value={date} mode={mode} is24Hour={true} display="default" onChange={onChangeDP} />}
        <View>
          <StyledText style={styles.inputText}>Duration in days (0 = ongoing) *</StyledText>
          <Input>
            <InputField
              value={duration.toString()}
              onChangeText={input => setDuration(Number(input))}
              placeholder="Duration in days"
              keyboardType="numeric"
            />
          </Input>
        </View>
        <View>
          <StyledText style={styles.inputText}>Moments of intake *</StyledText>
          {moments.map((moment, index) => (
            <View key={index} style={{flexDirection: 'row', alignItems: 'center', marginBottom: 8}}>
              <Input style={{flex: 1}}>
                <InputField
                  value={
                    `${String(moment.hour).padStart(2, '0')}:${String(moment.minute).padStart(2, '0')}`
                  }
                  editable={false}
                  placeholder="Select time"
                />
              </Input>
              <Button
                variant="outline"
                style={[styles.button, {backgroundColor: colors.background, borderColor: colors.border}, {marginLeft: 8}]}
                onPress={() => {
                  const newMoments = [...moments]
                  newMoments.splice(index, 1)
                  setMoments(newMoments)
                }}>
                <FontAwesome5 name="trash" size={16} color={colors.text} />
              </Button>
            </View>
          ))}
          <Button
            variant="outline"
            style={[
              styles.button,
              {backgroundColor: colors.background, borderColor: colors.border},
              {alignSelf: 'flex-start'},
            ]}
            onPress={showTimepicker}>
            <FontAwesome5 name="plus" size={16} />
            <ButtonText style={{marginLeft: 8}}>Add intake moment</ButtonText>
          </Button>
        </View>
        <View>
          <StyledText style={styles.inputText}>Days of the week *</StyledText>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 8}}>
            {daysOfWeek.map(day => (
              <Checkbox
                key={day}
                size="lg"
                isChecked={days[day]}
                style={{width: 0.15 * width, marginRight: 8}}
                onChange={checked => setDays(prev => ({...prev, [day]: checked}))}
                value={day}>
                <CheckboxIndicator>
                  <CheckboxIcon as={CheckIcon} />
                </CheckboxIndicator>
                <CheckboxLabel style={{marginLeft: 4}}>{getDayAbbreviation(day)}</CheckboxLabel>
              </Checkbox>
            ))}
          </View>
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end', marginTop: 20, gap: 20}}>
          <Button onPress={handleCreateUpdatePill}>
            <ButtonText>{id ? 'Update medication' : 'Add medication'}</ButtonText>
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

export default PillForm

const styles = StyleSheet.create({
  title: {fontSize: 24, fontWeight: 'bold'},
  inputText: {fontSize: 16, fontWeight: 'normal', marginBottom: 4},
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
