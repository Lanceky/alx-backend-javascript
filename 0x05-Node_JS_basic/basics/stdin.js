process.stdout.write("Welcome to the basics, Enter you name here: \n")

//get user input using stdin
process.stdin.on('readable', ()=>{
    const chunk = process.stdin.read();
    if (chunk !==null){
        process.stdout.write(`You name is ${chunk} `);
    } 
});
process.stdin.on('end', ()=>{
    process.stdin.write("This complex software's gonna close now")
})