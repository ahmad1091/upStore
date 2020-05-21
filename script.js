
function each(array, func) {
  for (var i = 0; i < array.length; i++) {
    func(array[i], i);
  }
}

function reduce(arr, f, acc  ) {
  if (acc === undefined) {
    acc = arr[0];
    arr = arr.slice(1);
  }
  each(arr, function(element, i){
    acc = f(acc, element, i);
  });
  return acc;
}



function Buyer(){
	var buyerObj = {};
	buyerObj.name='';
	buyerObj.cart=[];
	buyerObj.addToCart=addToCart;
	buyerObj.deletFromCart=deletFromCart;
	buyerObj.buy=buy;
	return buyerObj;
}

var addToCart = function(product){
	if (product[0].quantityAvailable === 0) {
		 return'There is no quantity left from this item'
	}
 this.cart.push(product[0]);
 cartNum.textContent=user.cart.length;
 return 'Added Successfully'
}

var deletFromCart =function(product){
var index = reduce(this.cart,function(res,e,i){
	if (e.name === product[0].name) {
			return res = i;
		}
},0	)
console.log(index);
 this.cart.splice(index,1);
 cartNum.textContent=user.cart.length;
 cartDisplay();
 return 'Deleted Successfully'
}

var buy = function(){
var carts =this.cart;
	products.map((e) => {
      for (var i = 0; i < carts.length; i++) {
      	if(carts[i].name===e.name){
      		e.quantityAvailable --;
      	}
      }

	});

	this.cart=[];
    cartNum.textContent=user.cart.length;
	cartDisplay()
	return 'You Successfully bought all the item inside the cart '
}

var user = Buyer();
	var homeBtn = document.getElementById('home');
	var container = document.getElementById('containerDiv');
	var categorySelect =document.getElementById('category');
	var cartNum = document.getElementById('sp');
	var userBtn= document.getElementById('userBtn');
	var userName= document.getElementById('userName');
	// var userDiv =document.getElementById('userInput');
	var submitDiv =document.getElementById('submit');
	var cartClick = document.getElementById('cartId');
	var catDiv =document.getElementById('sleDiv')

	homeBtn.onclick=function(){
		mainPage(products);
		buyDiv.className='hide';
		catDiv.className='show';

	}
		mainPage(products);
	categorySelect.addEventListener('change',function(e){
		var catogorizedArray = products.filter(element => {return element.category === e.target.value});
		mainPage(catogorizedArray);
		})

function mainPage(arr){
	container.innerHTML=''
	arr.map((e)=>{
		var productDiv =document.createElement('div');
		var productImg = document.createElement('img');
		var productName = document.createElement('h2');
		var price = document.createElement('span');
		var quantity = document.createElement('span');
		var productCategory = document.createElement('span');
		var shipping = document.createElement('span');
	    var addBtn = document.createElement('button');

	   	productDiv.id = 'subDiv';
		addBtn.id="addBtn";
		productImg.src = e.img;
		productName.textContent=e.name;
		price.textContent='Price: '+e.price;
		quantity.textContent='Available: '+e.quantityAvailable;
		productCategory.textContent='Category: '+e.category;
		shipping.textContent='Shippin cost '+e.shipping;
		addBtn.textContent='Add to cart';
	    cartNum.textContent=user.cart.length;

		productDiv.appendChild(productImg);
		productDiv.appendChild(productName);
		productDiv.appendChild(price);
		productDiv.appendChild(quantity);
		productDiv.appendChild(productCategory);
		productDiv.appendChild(shipping);
	    productDiv.appendChild(addBtn);
	    container.appendChild(productDiv);

 		var repeated =[]
		addBtn.onclick=function(e){
			var name = e.target.parentNode.childNodes[1].textContent;	
			var repeated = user.cart.filter(e => { return e.name === name });
			var myProduct = products.filter(e => { return e.name === name });
			if (repeated.length !== 0 ) {
				swal('Hello ' +user.name ,'You already chose this element before','warning');
			}else{
			swal('Hello ' +user.name ,user.addToCart(myProduct),'success');
			}
		}
		})

}
	
   
   cartClick.addEventListener("click", cartDisplay);;

    function cartDisplay (){
	    container.innerHTML='';
	    catDiv.className='hide';
   		buyDiv.className='show';
	    var message =document.getElementById('buyDiv')
    	var buyBtn = document.createElement('button');
    	buyBtn.textContent='Buy All';
    	buyBtn.id='addBtn'
    	var cartHeader = document.createElement('h2');
    	if (user.cart.length===0) {
    		message.textContent=''
    		cartHeader.textContent='Your cart is empty'
		    message.appendChild(cartHeader)
    	}else{

	    	message.textContent=''
	        cartHeader.textContent='Welcome to your cart';
	    	cartHeader.appendChild(buyBtn)
			message.appendChild(cartHeader)

		user.cart.map((element)=>{
	    var productDiv =document.createElement('div');
		var productImg = document.createElement('img');
		var productName = document.createElement('h2');
		var price = document.createElement('span');
		var quantity = document.createElement('span');
		var productCategory = document.createElement('span');
		var shipping = document.createElement('span');
	    var removeBtn = document.createElement('button');
	    
	    productDiv.id = 'subDiv';
		removeBtn.id="addBtn";
		productImg.src = element.img;
		productName.textContent=element.name;
		price.textContent='Price: '+element.price;
		quantity.textContent='Available: '+element.quantityAvailable;
		productCategory.textContent='Category: '+element.category;
		shipping.textContent='Shippin cost '+element.shipping;
		removeBtn.textContent='Remove Element';
	    cartNum.textContent=user.cart.length;

		productDiv.appendChild(productImg);
		productDiv.appendChild(productName);
		productDiv.appendChild(price);
		productDiv.appendChild(quantity);
		productDiv.appendChild(productCategory);
		productDiv.appendChild(shipping);
	    productDiv.appendChild(removeBtn);
	    
		container.appendChild(productDiv);
		removeBtn.onclick=function(e){
			user = window.user;
			var name = e.target.parentNode.childNodes[1].textContent
			var myProduct = products.filter(e => { return e.name === name });
						console.log('my product',myProduct);
			swal('Hello ' +user.name ,user.deletFromCart(myProduct), "success");
		}
	})
		buyBtn.onclick=function(){
		swal('Hello ' +user.name ,user.buy(), "success");

		}
    	}


	    }
	    
    


 userBtn.onclick = function(){
 	user.name = userName.value;
 	var yourName  = document.createElement('h2');;
 	var text =document.createTextNode('Welcome  ' + user.name);
 	yourName.appendChild(text);
 	var parentDiv = submitDiv.parentNode
 	parentDiv.replaceChild(yourName,submitDiv);
 }

