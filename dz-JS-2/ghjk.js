
//1-----------------------------------------------------------------------------------

// function comparisonOfNumbers(num1, num2) {
//     return num1 < num2 ? -1 : num1 > num2 ? 1 : 0;
// }
//
// console.log(comparisonOfNumbers(2,2))

//2-----------------------------------------------------------------------------

// function factorial(num) {
//
//     if (num === 0 || num <= 0) return 0;
//     let factorial = 1;
//     for (let i = 1; i <= num; i++) {factorial *= i; }
//     return factorial;
// }
//
// console.log(factorial(3))

//3-----------------------------------------------------------------------------

// function concatenationOfNumbers(num1, num2, num3){
//     return (typeof(num1) === "number" ? String(num1) : num1) + (typeof(num2) === "number" ? String(num2) : num2) + (typeof(num3) === "number" ? String(num3) : num3)
// }
// console.log(concatenationOfNumbers(3, 4, "3"))

//4-----------------------------------------------------------------------------

// function areaOfThePolygon(length, width = 0){
//     return width === 0 ? length * length : length * width
// }
//
// console.log(areaOfThePolygon(3))

//5-----------------------------------------------------------------------------

// function perfectNumber(number) {
//     let sum = 1
//     for (let i = 2; i < number; i++) {
//         if (number % i === 0) {sum += i}
//     }
//     return sum === number
// }


//6-----------------------------------------------------------------------------

// function perfectNumberRange(min, max) {
//     for (let i = min; i <= max; i++) { if(perfectNumber(i)){ console.log(i) } }
// }
//
// perfectNumberRange(2, 10060)

//7-----------------------------------------------------------------------------

// function time(hours, minutes = '0', seconds = '0' ) {
//     console.log(`hours - ${hours < 10 ? `0${hours}` : hours} | minutes - ${minutes < 10 ? `0${minutes}` : minutes} | seconds - ${seconds < 10 ? `0${seconds}` : seconds}`)
// }
// time(2, 3)

//8-----------------------------------------------------------------------------

// function conversionToSeconds(hours, minutes, seconds){
//     return seconds + (minutes * 60) + (hours * 60**2)
// }
// console.log(conversionToSeconds(1, 1, 4))

//9-----------------------------------------------------------------------------
//
// function conversion(secondss){
//     let hours = Math.floor(secondss / 60**2)
//     let minutes = Math.floor((secondss % 60**2) /60)
//     let seconds = (secondss % 60**2) % 60
//     return `hours - ${hours} | minutes - ${minutes} | seconds - ${seconds}`
// }
// console.log(conversion(3664))

//10-----------------------------------------------------------------------------

// function differenceBetweenDates(h1, m1, s1, h2, m2, s2) {
//     let time1 = conversionToSeconds(h1, m1, s1);
//     let time2 = conversionToSeconds(h2, m2, s2);
//     let diffInSeconds = Math.abs(time1 - time2)
//     return conversion(diffInSeconds);
// }
//
// console.log(differenceBetweenDates(1, 2, 3, 2, 3, 4));