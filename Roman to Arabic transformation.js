function characterToArabic (character){
    switch(character) {
        case "I": return 1
        case "V": return 5
        case "X": return 10
        case "L": return 50
        case "C": return 100
        case "D": return 500
        case "M": return 1000
        default: return -1
        }
    }
    
function Arabic(word) {
  if (word == null) 
      return 0;
      let totalValue = 0
      let value = 0;
      let prev = 0;
      for (let i = 0; i < word.length; i++) {
        let split = word.split("")
        let current = characterToArabic(split[i])
        if (current > prev){
           totalValue -= 2 * value 
            } else if (current !== prev) {
              value = 0
            }
            value += current
            totalValue += current
            prev = current 
  }
  return totalValue
}
console.log(Arabic("MCMXCIV"))