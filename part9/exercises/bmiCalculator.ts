const calculateBmi= (cm:number, kg:number) => {
  const bmi = kg / Math.pow(cm / 100, 2)
  switch (true) {
    case (bmi < 18.5):
      return 'Underweight'
    case (bmi >= 18.5 && bmi < 25):
      return 'Normal (healthy weight)'
    case (bmi >= 25 && bmi < 30):
      return 'Overweight'
    case (bmi >= 30):
      return 'Obese'
    default:
      throw new Error('Invalid arguments')
  }
}


try {
  console.log(calculateBmi(180, 74))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong, error: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
