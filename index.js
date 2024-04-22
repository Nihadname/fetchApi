// // Example POST method implementation:
// // // async function postData(url = "", data = {}) {
// // //     // Default options are marked with *
// // //     const response = await fetch(url, {
// // //       method: "POST", // *GET, POST, PUT, DELETE, etc.
// // //       mode: "cors", // no-cors, *cors, same-origin
// // //       cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
// // //       credentials: "same-origin", // include, *same-origin, omit
// // //       headers: {
// // //         "Content-Type": "application/json",
// // //         // 'Content-Type': 'application/x-www-form-urlencoded',
// // //       },
// // //       redirect: "follow", // manual, *follow, error
// // //       referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
// // //       body: JSON.stringify(data), // body data type must match "Content-Type" header
// // //     });
// // //     return response.json(); // parses JSON response into native JavaScript objects
// // //   }
  
// // //   postData('https://jsonplaceholder.typicode.com/todos/1', { answer: 42 }).then((data) => {
// // //     console.log(data); // JSON data parsed by `data.json()` call
// // //   });
// //postData();
// async function getText(file){
//     let x=await fetch(file);
//     if(!x.ok){
//         throw new Error('Failed to fetch text');
//     }
//     const text = await x.text();
//     console.log(text);

// }
// //getText('https://jsonplaceholder.typicode.com/todos')
// const controller = new AbortController();
// const signal = controller.signal;

// fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })
//   .then(response => {
//     // Handle response
//     console.log(response);
//   })
//   .catch(error => {
//     if (error.name === 'AbortError') {
//       // Handle request cancellation
//    //   console.log(error);
//     } else {
//       // Handle other errors
//     }
//   });
//   async function* makeTextFileLineIterator(fileURL) {
//     const utf8Decoder = new TextDecoder("utf-8");
//     const response = await fetch(fileURL);
//     const reader = response.body.getReader();
//     let { value: chunk, done: readerDone } = await reader.read();
//     chunk = chunk ? utf8Decoder.decode(chunk) : "";
  
//     const newline = /\r?\n/gm;
//     let startIndex = 0;
//     let result;
  
//     while (true) {
//       const result = newline.exec(chunk);
//       if (!result) {
//         if (readerDone) break;
//         const remainder = chunk.substr(startIndex);
//         ({ value: chunk, done: readerDone } = await reader.read());
//         chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : "");
//         startIndex = newline.lastIndex = 0;
//         continue;
//       }
//       yield chunk.substring(startIndex, result.index);
//       startIndex = newline.lastIndex;
//     }
  
//     if (startIndex < chunk.length) {
//       // Last line didn't end in a newline char
//       yield chunk.substr(startIndex);
//     }
// }

// async function processLine(line) {
//     console.log("Processed line:", line);
// }

// async function run() {
//     const fileURL = "file:///C:/Users/nihad/OneDrive/Desktop/practiceJs/q.txt";
//     for await (const line of makeTextFileLineIterator(fileURL)) {
//         await processLine(line);
//     }
// }

// run();

  
  // Step 1: Create an AbortController instance
// Step 1: Create an AbortController instance
const controller = new AbortController();
const signal = controller.signal;

// Step 2: Associate the controller with the fetch request
const fetchPromise = fetch('https://jsonplaceholder.typicode.com/todos/1', { signal })
  .then(response => {
    // This code won't be executed if the fetch request is aborted
    console.log('Fetch completed successfully');
  })
  .catch(error => {
    if (error.name === 'AbortError') {
      console.log('Fetch request aborted');
    } else {
      console.error('Error fetching data:', error);
    }
  });

// Step 3: Call the abort() method after 1 second
setTimeout(() => {
  controller.abort(); // Cancels the fetch request after 1 second
}); // Cancels after 1 second
