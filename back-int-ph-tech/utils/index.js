function descendtCharByAscii(string) {
    const charArray = string.split('');
    // custom sort decending order by ascii value
    charArray.sort((a, b) => b.charCodeAt(0) - a.charCodeAt(0));
    const sortedString = charArray.join('');

    return sortedString;
}

function eECounterStr(string) {
    return string.replace(/[^Ee]/g, '');
}

function eECounterTree(data) {
    let eCount = 0;
    if (Array.isArray(data)) {
        // if array call itself
        console.log('ARRAY')
        data.forEach((val) => {
            eCount += eECounterTree(val);
        });
    } else if (typeof data === 'object') {
        // if object traverse to its keys at the same time call it self and count the E in key
        Object.keys(data).forEach((key) => {
            if (typeof key === 'string') {
                eCount += eECounterStr(key).length
            }
            // call it self for another process of its child
            eCount += eECounterTree(data[key]);
        });
    }
    // else it is a single value
    return eCount;
}

function process2CD(dataObj) {
    if (Array.isArray(dataObj)) {
        // if array call it self to process again
        let newArrObj = [];
        while (dataObj.length > 0) {
            let newVal = process2CD(dataObj.pop())
            newArrObj.push(newVal);
        }

        return newArrObj;
    } else if (typeof dataObj === 'object') {
        let eCount = 0;
        Object.keys(dataObj).forEach((k) => { // travers to its keys
            eCount += eECounterStr(k).length; // count e's

            let kVal = dataObj[k]; // value of current key

            if (typeof kVal !== 'object') {
                kVal = String(kVal);
            }

            let newKey = descendtCharByAscii(k); // new key

            delete dataObj[k]; // delete old value

            // call it self to process objects value
            dataObj[newKey] = process2CD(kVal);
        });

        // put eCount on current dataObj
        dataObj.eCount = eCount;
    } else if (typeof dataObj === 'string') {
        return descendtCharByAscii(dataObj);
    }
    
    return dataObj;
}

function deepClone(input) {
    // handle non-object and null values
    if (typeof input !== 'object' || input === null) {
        return input;
    }

    // determine whether the input is an array or an object
    const isArray = Array.isArray(input);

    // initialize the result as an empty array or object
    const result = isArray ? [] : {};

    // oterate over the input keys (or indices for arrays)
    for (const key in input) {
        // check if the key is a property of the input object itself (not inherited)
        if (input.hasOwnProperty(key)) {
            // travers deep clone each property or element
            result[key] = deepClone(input[key]);
        }
    }

    return result;
}

module.exports = {
    deepClone,
    process2CD,
}