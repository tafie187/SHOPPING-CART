let check = false;

// Function to change the value of a product in the cart
function changeVal(el) {
  let qt = parseFloat(el.parent().children(".qt").html()); // Get the quantity of the product
  let price = parseFloat(el.parent().children(".price").html()); // Get the price of the product
  let eq = Math.round(price * qt * 100) / 100; // Calculate the total price of the product
  
  el.parent().children(".full-price").html(eq + " ZAR"); // Update the displayed total price of the product
  
  changeTotal(); // Recalculate and update the overall total of the cart
}

// Function to update the overall total of the cart
function changeTotal() {
  let price = 0;
  
  $(".full-price").each(function(index) {
    price += parseFloat($(".full-price").eq(index).html()); // Sum up the individual prices of the products
  });
  
  price = Math.round(price * 100) / 100; // Round the total price to two decimal places
  let tax = Math.round(price * 0.05 * 100) / 100; // Calculate the tax (5% of the total price)
  let shipping = parseFloat($(".shipping span").html()); // Get the shipping cost
  let fullPrice = Math.round((price + tax + shipping) * 100) / 100; // Calculate the final total price
  
  if (price == 0) {
    fullPrice = 0; // If the price is zero, set the total price to zero as well
  }
  
  $(".subtotal span").html(price + " ZAR"); // Update the displayed subtotal
  $(".tax span").html(tax + " ZAR"); // Update the displayed tax
  $(".total span").html(fullPrice + " ZAR"); // Update the displayed total price
}

$(document).ready(function() {
  // Click handler for the "remove" buttons
  $(".remove").click(function() {
    let el = $(this);
    el.parent().parent().addClass("removed"); // Mark the parent element as removed
    window.setTimeout(function() {
      el.parent().parent().slideUp('fast', function() { 
        el.parent().parent().remove(); // Remove the parent element from the DOM after a short delay
        if ($(".product").length == 0) {
          if (check) {
            $("#cart").html("<h1>The shop does not function"); // Display a message if the shop does not function
          } else {
            $("#cart").html("<h1>No products!</h1>"); // Display a message if there are no products
          }
        }
        changeTotal(); // Recalculate and update the overall total of the cart
      });
    }, 200);
  });
  
  // Click handler for the "qt-plus" buttons
  $(".qt-plus").click(function() {
    $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1); // Increment the quantity value
    
    $(this).parent().children(".full-price").addClass("added"); // Add the "added" class for visual effect
    
    let el = $(this);
    window.setTimeout(function() {
      el.parent().children(".full-price").removeClass("added");
      changeVal(el); // Call the changeVal function to update the product's value and overall total
    }, 150);
  });
  
  // Click handler for the "qt-minus" buttons
  $(".qt-minus").click(function() {
    let child = $(this).parent().children(".qt");
    
    if (parseInt(child.html()) > 1) {
      child.html(parseInt(child.html()) - 1); // Decrement the quantity value if it is greater than 1
    }
    
    $(this).parent().children(".full-price").addClass("minused"); // Add the "minused" class for visual effect
    
    let el = $(this);
    window.setTimeout(function() {
      el.parent().children(".full-price").removeClass("minused");
      changeVal(el); // Call the changeVal function to update the product's value and overall total
    }, 150);
  });
  
  window.setTimeout(function() {
    $(".is-open").removeClass("is-open"); // Remove the "is-open" class after a delay
  }, 1200);
  
  // Click handler for the general buttons
  $(".btn").click(function() {
    check = true; // Set the check variable to true
    $(".remove").click(); // Trigger a click event on all "remove" buttons to remove all products from the cart
  });
});
