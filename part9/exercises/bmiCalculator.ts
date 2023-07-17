const calculateBmi= (cm:number, kg:number) => {
  if (cm === 0 || kg === 0) throw new Error('Invalid parameters')

  const bmi = kg / Math.pow(cm / 100, 2)
  if (bmi < 18.5){
    return 'Underweight'
  }
  if (bmi < 25){
    return 'Normal (healthy weight)'
  }
  if (bmi < 30){
    return 'Overweight'
  }
  if (bmi > 30){
    return 'Obese'
  }
}


console.log(calculateBmi(180, 74))
