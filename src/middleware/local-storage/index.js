
export default {
    insert: function (table, item) {
        // Add id to the item
        item.id = new Date().getTime();
        //Insert item into DB
        var arr = this.select(table); // Update the array and not overwrite the array
        // if (arr == null){ // The first time array is NULL, we set arr = [];
        //     arr = [];
        // }
        arr.push(item);
        localStorage.setItem(table, JSON.stringify(arr));
    }, // In the new JS version, if the [key] == value, we dont need to write again the value. like - insert.
    select: function (table) {
        var result = localStorage.getItem(table);
        if (result == null) {
            result = '[]'; // because need to string array...after we parse the string to object
        }
        return JSON.parse(result);
    },
    update: function (table, id, item) {
        // debugger;
        // select the relevant item from array
        var arr = this.select(table);
        var index = this._searchIndexById(table, id);
        //If index not found
        if (!(index > -1)) { // OR (index == undefined)
            return;
        }
        // Check if item have values
        for (var property in item) { // For in - know to run in object and put value in the relevant field
            if (item[property]) { // If exist value in the index of item, run.
                var selectedItem = arr[index]; // The index of the item
                selectedItem[property] = item[property]; // Update the new property in the current index of item
            }
        }
        // update the array to localStorage
        localStorage.setItem(table, JSON.stringify(arr));
    },
    remove: function (table, id) {
        // select the relevant item from array
        var arr = this.select(table);
        var foundIndex = this._searchIndexById(table, id);
        //If foundIndex not found
        if (!(foundIndex > -1)) { // OR (foundIndex == undefined)
            return;
        }
        // remove the item from array
        arr.splice(foundIndex, 1);
        // update the array to localStorage
        localStorage.setItem(table, JSON.stringify(arr));
    },
    getItemById: function (table, id){
        var arr = this.select(table);
        return arr.find(function (item){  //search into array --> arr.find()
            return item.id == id;
        })
    },
    _searchIndexById: function (table, id) { // '_' <-- private variant
        // select the relevant item from array
        var arr = this.select(table);
        var foundIndex = undefined;
        for (var i = 0; i < arr.length; i++) {
            var item = arr[i];
            if (item.id == id) {
                foundIndex = i;
                break;
            }
        }
        return foundIndex;
    }
};

// function insert(table, item) {
//     // Add id to the item
//     item.id = new Date().getTime();
//     //Insert item into DB
//     var arr = select(table); // Update the array and not overwrite the array
//     // if (arr == null){ // The first time array is NULL, we set arr = [];
//     //     arr = [];
//     // }
//     arr.push(item);
//     localStorage.setItem(table, JSON.stringify(arr));
// }

// Select items from DB
// function select(table) {
//     var result = localStorage.getItem(table);
//     if (result == null) {
//         result = '[]'; // because need to string array...after we parse the string to object
//     }
//     return JSON.parse(result);
// }

// function remove(table, id) {
//     // select the relevant item from array
//     var arr = select(table);
//     var foundIndex = searchIndexById(table, id);
//
//     //If foundIndex not found
//     if (!(foundIndex > -1)) { // OR (foundIndex == undefined)
//         return;
//     }
//     // remove the item from array
//     arr.splice(foundIndex, 1);
//     // update the array to localStorage
//     localStorage.setItem(table, JSON.stringify(arr));
// }

// Update data to DB-()
// function update(table, id, item) {
//     // select the relevant item from array
//     var arr = select(table);
//     var index = searchIndexById(table, id);
//
//     //If index not found
//     if (!(index > -1)) { // OR (index == undefined)
//         return;
//     }
//
//     // Check if item have values
//     for (var property in item) { // For in - know to run in object and put value in the relevant field
//         if (item[property]) { // If exist value in the index of item, run.
//             var selectedItem = arr[index]; // The index of the item
//             selectedItem[property] = item[property]; // Update the new property in the current index of item
//         }
//     }
//     // Update the item in arr
//     /*arr[index] = item;*/
//
//     // update the array to localStorage
//     localStorage.setItem(table, JSON.stringify(arr));
// }

// function search(searchItem){
//     var arr = select();
//
//     if (!searchItem){ // OR (index == undefined)
//         searchItem = {};
//     }
//
//     for (var property in searchItem){
//         if (searchItem[property]){
//             var itemFind =
//         }
//     }
// }

// function searchIndexById(table, id) {
//     // select the relevant item from array
//     var arr = select(table);
//     var foundIndex = undefined;
//     for (var i = 0; i < arr.length; i++) {
//         var item = arr[i];
//         if (item.id == id) {
//             foundIndex = i;
//             break;
//         }
//     }
//     return foundIndex;
// }