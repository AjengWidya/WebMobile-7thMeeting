/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
/*jshint esversion: 6*/

const app = (() => {

  /*
    Fungsi berikut berguna untuk membuat promise. Promise merupakan nilai yang mungkin tersedia sekarang, nanti atau tidak sama sekali. Fungsi ini akan mengembalikan nilai yang seharusnya akan ditampilkan, bukan menampilkan nilai riil, dalam hal ini yaitu file "Spain.jpg". Parameter 'country' akan mengambil isi dari elemen <input>. Jika error, maka akan menampilkan pesan error yang didefinisikan dengan reject(). Jika berhasil, akan menghasilkan nama file berupa file gambar dengan format <nama negara> ditambah dengan ekstensi .png
  */
  function getImageName(country) {
    // create and return a promise
    country = country.toLowerCase();
    var promiseOfImageName  = new Promise(function(resolve, reject) {
        setTimeout(function() {
            if  (country  === 'spain' ||  country === 'chile' ||  country === 'peru') {
                resolve(country + '.png');
            } else {
                reject(Error('Didn\'t receive a valid country name!'));
            }
        },  1000);
    });
    console.log(promiseOfImageName);
    return  promiseOfImageName;

  }

  function isSpain(country) {

    // Optional - create and return a promise that resolves if input is "Spain"
    var promise = new Promise(function(resolve, reject) {
    //  do  a thing,  possibly  async,  then...
        if  ("<em>  everything  turned  out fine  </em>") {
            resolve("Stuff  worked!");
        }
        else  {
            reject(Error("It  broke"));
        }
    });

  }

  function flagChain(country) {

    // use the promise
    // return  getImageName(country)
    // .then(logSuccess, logError);

    // return  getImageName(country)
    // .then(logSuccess)
    // .catch(logError);

    // return  getImageName(country)
    // .then(logSuccess)
    // .then(undefined,  logError);

    return  getImageName(country)
    .then(fetchFlag)
    .then(processFlag)
    .then(appendFlag)
    .catch(logError);

  }

  function allFlags(promiseList) {

    // use promise.all
    var promises  = [
        getImageName('Spain'),
        getImageName('Chile'),
        getImageName('Peru')
    ];
    allFlags(promises).then(function(result)  {
        console.log(result);
    });

  }


  // call the allFlags function


  // use Promise.race
  var promise1  = new Promise(function(resolve, reject) {
    setTimeout(resolve, 500,  'one');
  });
  var promise2  = new Promise(function(resolve, reject) {
      setTimeout(resolve, 100,  'two');
  });
  Promise.race([promise1, promise2])
  .then(logSuccess)
  .catch(logError);


  /* Helper functions */

  function logSuccess(result) {
    console.log('Success!:\n' + result);
  }

  function logError(err) {
    console.log('Oh no!:\n' + err);
  }

  function returnFalse() {
    return false;
  }

  function fetchFlag(imageName) {
    return fetch('flags/' + imageName); // fetch returns a promise
  }

  function processFlag(flagResponse) {
    if (!flagResponse.ok) {
      throw Error('Bad response for flag request!'); // This will implicitly reject
    }
    return flagResponse.blob(); // blob() returns a promise
  }

  function appendFlag(flagBlob) {
    const flagImage = document.createElement('img');
    const flagDataURL = URL.createObjectURL(flagBlob);
    flagImage.src = flagDataURL;
    const imgContainer = document.getElementById('img-container');
    imgContainer.appendChild(flagImage);
    imgContainer.style.visibility = 'visible';
  }

  function fallbackName() {
    return 'chile.png';
  }

  // Don't worry if you don't understand this, it's not part of Promises.
  // We are using the JavaScript Module Pattern to enable unit testing of
  // our functions.
  return {
    getImageName: (getImageName),
    flagChain: (flagChain),
    isSpain: (isSpain),
    fetchFlag: (fetchFlag),
    processFlag: (processFlag),
    appendFlag: (appendFlag),
    allFlags: (allFlags)
  };

})();
