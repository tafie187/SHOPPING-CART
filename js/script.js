let check = false;

// Function to change the value of a product in the cart
function changeVal(el) {
  // Get the quantity of the product
  let qt = parseFloat(el.parent().children(".qt").html()); 
  // Get the price of the product
  let price = parseFloat(el.parent().children(".price").html()); 
  // Calculate the total price of the product
  let eq = Math.round(price * qt * 100) / 100; 
  
  // Update the displayed total price of the product
  el.parent().children(".full-price").html(eq + " ZAR"); 
  
  // Recalculate and update the overall total of the cart
  changeTotal(); 
}

// Function to update the overall total of the cart
function changeTotal() {
  let price = 0;
  
  $(".full-price").each(function(index) {
    // Sum up the individual prices of the products
    price += parseFloat($(".full-price").eq(index).html()); 
  });
  
  // Round the total price to two decimal places
  price = Math.round(price * 100) / 100; 
  // Calculate the tax (5% of the total price)
  let tax = Math.round(price * 0.05 * 100) / 100; 
  // Get the shipping cost
  let shipping = parseFloat($(".shipping span").html()); 
  // Calculate the final total price
  let fullPrice = Math.round((price + tax + shipping) * 100) / 100; 
  
  if (price == 0) {
    // If the price is zero, set the total price to zero as well
    fullPrice = 0; 
  }
  
  // Update the displayed subtotal
  $(".subtotal span").html(price + " ZAR"); 
  // Update the displayed tax
  $(".tax span").html(tax + " ZAR"); 
  // Update the displayed total price
  $(".total span").html(fullPrice + " ZAR"); 
}

$(document).ready(function() {
  // Click handler for the "remove" buttons
  $(".remove").click(function() {
    let el = $(this);
    // Mark the parent element as removed
    el.parent().parent().addClass("removed"); 
    window.setTimeout(function() {
      el.parent().parent().slideUp('fast', function() { 
        // Remove the parent element from the DOM after a short delay
        el.parent().parent().remove(); 
        if ($(".product").length == 0) {
          if (check) {
            // Display a message if the shop does not function
            $("#cart").html("<h1>The shop does not function"); 
          } else {
            // Display a message if there are no products
            $("#cart").html("<h1>No products!</h1>"); 
          }
        }
        // Recalculate and update the overall total of the cart
        changeTotal(); 
      });
    }, 200);
  });
  
  // Click handler for the "qt-plus" buttons
  $(".qt-plus").click(function() {
    // Increment the quantity value
    $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1); 
    
    // Add the "added" class for visual effect
    $(this).parent().children(".full-price").addClass("added"); 
    
    let el = $(this);
    window.setTimeout(function() {
      el.parent().children(".full-price").removeClass("added");
      // Call the changeVal function to update the product's value and overall total
      changeVal(el); 
    }, 150);
  });
  
  // Click handler for the "qt-minus" buttons
  $(".qt-minus").click(function() {
    let child = $(this).parent().children(".qt");
    
    if (parseInt(child.html()) > 1) {
      // Decrement the quantity value if it is greater than 1
      child.html(parseInt(child.html()) - 1); 
    }
    
    // Add the "minused" class for visual effect
    $(this).parent().children(".full-price").addClass("minused"); 
    
    let el = $(this);
    window.setTimeout(function() {
      el.parent().children(".full-price").removeClass("minused");
      // Call the changeVal function to update the product's value and overall total
      changeVal(el); 
    }, 150);
  });
  
  window.setTimeout(function() {
    // Remove the "is-open" class after a delay
    $(".is-open").removeClass("is-open"); 
  }, 1200);
  
  // Click handler for the general buttons
  $(".btn").click(function() {
    check = true; // Set the check variable to true
    $(".remove").click(); // Trigger a click event on all "remove" buttons to remove all products from the cart
  });
});
