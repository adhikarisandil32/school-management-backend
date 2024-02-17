async function fetchData(num) {
  // Simulating an API call
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Data for ${num}`), 1000)
  })
}

async function myFunction() {
  for (let i = 1; i <= 10; i++) {
    const data = await fetchData(i)
    console.log(data)
  }
}

myFunction()
