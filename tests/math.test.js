const {calculateTip,celsiusToFahrenheit,fahrenheitToCelsius,add} = require('../src/math');
test('should calculate tip',()=>{
    const total = calculateTip(10,0.3);
    expect(total).toBe(13)
   
   
    // if(total != 13){
    //     throw new Error('Total tip should be 13. Got '+total);
    // }
});
test('Should calculate total with default tip',()=>{
    const total = calculateTip(10);
    expect(total).toBe(12.5);
});


test('Should convert 32F to 0C',()=>{
    const convertedTemp = fahrenheitToCelsius(32);
    expect(convertedTemp).toBe(0);
});
test('Should convert 0C to 32F',()=>{
    const convertedTemp = celsiusToFahrenheit(0);
    expect(convertedTemp).toBe(32);
});
// test('Async test demo',(done)=>{
//     setTimeout(()=>{
//         expect(1).toBe(2);
//         done();
//     },2000);
// });
test('Should add two numbers',(done)=>{
    add(2,3).then((sum)=>{
        expect(sum).toBe(5);
        done();
    });
});
test('Should add two number async/await',async ()=>{
   const sum= await add(20,30);
   expect(sum).toBe(50);
});