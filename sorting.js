function ArrayList(){
	var array = [];

	var swap = function(index1, index2){
		var aux = array[index1];
		array[index1] = array[index2];
		array[index2] = aux;
	};

	this.insert = function(item){
		array.push(item);
	};

	this.toString = function(){
		return array.join();
	};

//worst-ase sorting algorithms
	this.bubbleSort = function(){
		var length = array.length;
		for(var i = 0; i < length; i++){
			for(var j = 0; j < length-1; j++){
				if(array[j] > array[j+1]){
					swap(j, j+1);
				}
			}
		}
	};

//O(n^2)
	this.modifiedBubbleSort = function(){
		var length = array.length;
		for(var i = 0; i < length; i++){
			for(var j = 0; j < length-1-i; j++){
				if (array[j] > array[j+1]){
					swap(j, j+1);
				}
			}
		}
	};

//O(n^2)
	this.selectionSort = function(){
		var length = array.length, 
			indexMin;
		for(var i = 0; i < length-1; i++){
			indexMin = i;
			for(var j = i; j < length; j++){
				if(array[indexMin] > array[j]){
					indexMin = j;
				}
			}
			if(i !== indexMin){
				swap(i, indexMin);
			}
		}
	};

	this.insertionSort = function(){
		var length = array.length, j, temp;
		for(var i = 1; i < length; i++){
			j = i;
			temp = array[i];
			while(j > 0 && array[j-1] > temp){
				array[j] = array[j-1];
				j--;
			}
			array[j] = temp;
		}
	};

//O(n log n)
	this.mergeSort = function(){
		array = mergeSortRec(array);
	};

	var mergeSortRec = function(array){
		var length = array.length;

		if(length === 1){
			return array;
		}

		var mid = Math.floor(length/2),
			left = array.slice(0, mid),
			right = array.slice(mid,length);

		return merge(mergeSortRec(left), mergeSortRec(right));
	};

	var merge = function(left, right){
		var result = [],
			il = 0,
			ir = 0;

		while(il < left.length && ir < right.length){
			if(left[il] < right[ir]){
				result.push(left[il++]);
			} else {
				result.push(right[ir++]);
			}
		}

		while(il < left.length){
			result.push(left[il++]);
		}

		while(ir < right.length){
			result.push(right[ir++]);
		}

		return result;
	};

	this.quickSort = function(){
		quick(array, 0, array.length-1);
	};

	var quick = function(array, left, right){
		
		var index;

		if(array.length > 1){
			index = partition(array, left, right);

			if(left < index - 1){
				quick(array, left, index - 1);
			}

			if(index < right){
				quick(array, index, right);
			}
		}
	};

	var partition = function(array, left, right){

		var pivot = array[Math.floor((right + left / 2))],
			i = left,
			j = right;
	
			while(i <= j){
				while(array[i] < pivot){
					i++;
				}
				while(array[j] > pivot){
					j--;
				}
				if(i <= j ){
					swapQuickSort(array, i, j);
					i++;
					j--;
				}
			}
			return i;
	};

	var swapQuickSort = function(array, index1, index2){
		var aux = array[index1];
		array[index1] = array[index2];
		array[index2] = aux;
	};
}

function createNonSortedArray(size){
	var array = new ArrayList();
	for(var i = size; i > 0; i--){
		array.insert(i);
	}

	return array;
}

var array = createNonSortedArray(5);
console.log(array.toString());
//array.bubbleSort();
//array.selectionSort();
console.log(array.toString());
