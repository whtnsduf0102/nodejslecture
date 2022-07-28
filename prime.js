//소수찾기예제
//워크스레드를 사용하지않음(싱글스레드 일 때)

const min = 2;
const max = 10_000_000;
const primes = [];

function generatePrimes(start, range){
    let isPrime = true;
    const end = start + range;
    for(let i = start; i < end; i++){
        for(let j = min; j < Math.sqrt(end); j++){
            if( i !== j && i % j === 0 ){
                isPrime = false;
                break;
            }
        }
        if(isPrime){
            primes.push(i);
        }
        isPrime = true;
    }
}

console.time('prime');
generatePrimes(min, max);
console.timeEnd('prime');
console.log(primes.length);