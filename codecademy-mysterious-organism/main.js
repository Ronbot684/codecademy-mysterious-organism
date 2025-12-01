// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G']
  return dnaBases[Math.floor(Math.random() * 4)] 
}

// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = []
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase())
  }
  return newStrand
}

// Function to make unique specimen numbers (+9 million might be a bit overkill)
const numberGen = () => {
  return Math.floor(Math.random() * 9999999) + 1
}

// Add your functions below:

// Add factory function that stores the specimen number and dna
const pAequorFactory = (specimenNum, dna) => {
  let pAequor = {
    specimenNum: specimenNum,
    dna: dna,
    // Add mutate method that picks a random dna base and changes it, then returns the new dna
    mutate () {
      let ranNum = Math.floor(Math.random() * 15)
      let check = this.dna[ranNum]
      let newDna = returnRandBase()

      // Loop makes sure that the new random base and the old base aren't the same
      while (check === newDna) {
        newDna = returnRandBase()
      }

      this.dna[ranNum] = newDna 
    
      return this.dna
    },
    //Add compare method that takes two instances of pAequor and compares how similar their dna is
    compareDNA (pAObj) {
      let correct = 0
      let percent = 0

      //Loop checks and adds if the dna bases are the same at the same spot
      for (let i = 0; i < this.dna.length; i++) {
        if (this.dna[i] === pAObj.dna[i]) {
          correct += 1
        }
      }

      percent += (correct / 15) * 100

      console.log(`Specimen #${this.specimenNum} and specimen #${pAObj.specimenNum} have ${percent}% of their DNA in common.`)
    },
    //Add a checking method that checks and returns if the specimen is likely to survive or not based on if 60% or more of the bases of dna are C or G
    willLikelySurvive () {
      let cOrG = 0
      let result = 0

      for (let j = 0; j < this.dna.length; j++) {
        if ((this.dna[j] === 'C') || (this.dna[j] === 'G')) {
          cOrG += 1
        }
      }

      result += (cOrG / 15) * 100

      if (result >= 60) {
        return true
      } else {
        return false
      }
    },
    //Bonus: Add a method that returns a complementing dna strand of the organism's actual dna strand
    complementStrand () {
      let compStrand = []

      for (let l = 0; l < this.dna.length; l++) {
        switch (this.dna[l]) {
          case 'A':
            compStrand.push('T')
            break;
          case 'T':
            compStrand.push('A')
            break;
          case 'C':
            compStrand.push('G')
            break;
          case 'G':
            compStrand.push('C')
            break;
        }
      }

      return compStrand
    }
  };

  return pAequor
};

//An array for later use
const survivingPAequor = []

//Create 30 instances of pAequor that can survive and put them in an array
const pAequorPrinter = (num) => {
  let numChecker = []
  let test

  for (let k = 0; k < num; k++) {
    test = (pAequorFactory(numberGen(), mockUpStrand()))

    if ((test.willLikelySurvive()) && (survivingPAequor.length === 0)) {
      survivingPAequor.push(test)
      numChecker.push(test.specimenNum)
      //Below 'else if' check the secondary array to see if the potential new organism has a unique specimen number
    } else if ((test.willLikelySurvive()) && (!numChecker.includes(test.specimenNum))) {
      survivingPAequor.push(test)
      numChecker.push(test.specimenNum)
    } else {
      k --
    }
  }
}
//Doesn't print or return the array, as it just asks to save them to an array