const socket = io();

socket.on('removeProdutFinal', (msg) => {
    console.log("THE ADMIN DELETED",msg);
    removeProduct(msg['title']);
});

socket.on('addProductFinal',(msg) => {
    addProduct(msg['title'], msg['description'], msg['price'])
    console.log("THE ADMIN ADDED",msg['title']);
});

function addProduct(title, description, price)
{
    let varNewProduct = $(".product").first().clone();
    varNewProduct.find("h3").text(title);
    varNewProduct.find("p").eq(0).text(description);
    varNewProduct.find("p").eq(1).text("$" + price);
    varNewProduct.css("display","block");
    $(".products-grid").append(varNewProduct);
}
socket.on('editProductFinal', (msg) => {
    
    let product = getProductByTitle(msg['oldTitle']);
    let title = product.find("h3").text();
    let description = product.find("p").eq(0).text();
    let price = product.find("p").eq(1).text().substring(1);
    if(msg['title'] != "")
    {
        title = msg['title'];
    }
    
    if(msg['description'] != "")
    {
        description = msg['description'];
    }
    if(msg['price'] != "")
    {
        price = msg['price'];
    }

    editProduct(product,title, description, price);
    console.log('THE ADMIN EDITED',msg['oldTitle']);
});

$(document).on("click",".add-to-cart-btn",function (e) { 
    e.preventDefault();
    
    var txt = $(this).parent(".product").find("h3").text();
    //console.log(txt);
    var finalS = "<li class=\"bag-item list-group-item\">" + txt + "&ensp;" +
    "<b>" + $(this).parent(".product").find(".price-p").text() + "</b></li>";
    if($(".bag-list:contains('" + txt + "')").length == 0)
    {
        $(".cart-content").find("ul").prepend(finalS);
    }
    else
    {
        alert("This product is already in the bag!");
        return;
    }
    updateTotalCost();
    //console.log($(".cart-content").find("li").first().text().split("$")[1]);
    
});

$(".bag-list").on("click",".bag-item",function (e) {
    e.preventDefault();
    $(this).remove();
    updateTotalCost();
});


function updateTotalCost()
{
    var finalAmount = 0.0;
    Array.from($(".cart-content").find(".bag-item")).forEach(item => {
        finalAmount += parseFloat(item.innerHTML.split("$")[1].split("<")[0]);
    });
    finalAmount = finalAmount.toFixed(2);
    $(".total-bag-value").html("<li class=\"list-group-item total-bag-value\" style=\"font-size: 1.05rem;\">" +
    finalAmount + "$</li>");
}

function removeProduct(title)
{
    
    getProductByTitle(title).remove();
    if($(".bag-list .bag-item:contains(" + title + ")").length == 0)
    {
        return;
    }
    $(".bag-list .bag-item:contains(" + title + ")").remove();
    updateTotalCost();
}
$(document).on("click",".delete-icn",function(e){
    if(confirm("Click OK if you sure you want to delete " + $(this).parent(".product").find("h3").text() + ", Cancel otherwise"))
    {
        socket.emit('removeProduct', {title: $(this).parent(".product").find("h3").text()});
        try{
            $.ajax({
                url: "/products/"+$(this).parent(".product").find("h3").text(),
                type: "DELETE",
                success: function(res){
                    console.log("SUCCESS!!!! DELETED ");
                    
                }
            });
        }catch(err)
        {
            console.log("ERROR!!!! " + err);
        }
        
    }
    
});

$('.user-list-bag-page li').click(function(e){
    
    if($('.user-list-bag-page .dropdown-item.active:contains(' + $(this).text() + ")").text() == $(this).find("a").text())
    {
        //console.log("RETURN");
        return;
    }
    $('.user-list-bag-page .dropdown-item.active').attr("class","dropdown-item");
    $(this).find("a").attr("class", "dropdown-item active");
    if($(this).text() == "Admin")
    {
        $(".product").find("svg").css("display","block");
        $("#manager-menu-button").css("display","block");
    }
    else
    {
        $(".product").find("svg").css("display","none");
        $("#manager-menu-button").css("display","none");
    }
    
    
    
});

function getProductByTitle(title)
{
    return $(".product:has(h3:contains(" + title + "))")
    .filter(function(){return $(this).find("h3").text().trim() === title});
}

function editProduct(product, newTitle, newDescription, newPrice)
{
    var title = product.find("h3").text();
    var price = product.find("p").eq(1).text().substring(1);
    var originalTitle = title;
    product.find("h3").text(newTitle);
    product.find("p").eq(0).text(newDescription);
    product.find("p").eq(1).text("$" + newPrice);
    $(".bag-item").each(function(){
        let str1 = originalTitle + " $" + price;
        let str2 = $(this).text().trim();
        if (str1.trim().replace(/\s/g, ' ') == str2.replace(/\s/g, ' ')){
            let newString = newTitle + " $" + newPrice;
            $(this).text(newString);
        }
    })
    
    updateTotalCost();
}
$("#manager-menu-form").submit(function(e)
{
    e.preventDefault();
    
    
    var inputs = $("#manager-menu-form").find("input");
    var valuesDict = [];
    inputs.each(function(){
        //console.log("FOR: " + $(this) + " " + $(this).css("display"));
        if($(this).parent("div").css("display") != "none")
        {
            valuesDict.push($(this).val());
        }
        
    });
    $("#staticBackdrop1").modal('toggle');
    
    var checkedValue = $('input[name=flexRadioDefault]:checked').closest('div').find("label").text().replace(/\s/g, '');
    if (checkedValue == "Edit")
    {
        if($(".product").length == 1)
        {
            return;
        }
        var product = getProductByTitle(valuesDict[1]);
        if (product.length == 0)
        {
            return;
        }
        if(getProductByTitle(valuesDict[0]).length != 0)
        {
            return;
        }
        console.log(valuesDict[3])
        let msg = {oldTitle: valuesDict[1],title: valuesDict[0], description: valuesDict[2], price: valuesDict[3]};
        socket.emit('editProduct', msg);
        let title = product.find("h3").text();
        let description = product.find("p").eq(0).text();
        let price = product.find("p").eq(1).text().substring(1);
        let category = "editedCategory";
        let color = "editedColor";
        let size = ['L','S','BIG L'];
        let img = 'editImg';
        if(msg['title'] != "")
        {
            title = msg['title'];
        }
        
        if(msg['description'] != "")
        {
            description = msg['description'];
        }
        if(msg['price'] != "")
        {
            price = msg['price'];
        }
        $.ajax({
            url: "/products/"+valuesDict[1],
            type: "PUT",
            data: {newTitle:title, description: description,category:category, color:color, size: size, price:price, img: img},
            success: function(res){
                console.log("SUCCESS!!!! EDITED " + JSON.stringify(res));
            }
        });
    }
    else
    {

        if($(".product").filter(function(){return $(this).find("h3").text() === valuesDict[0];}
        ).length != 0 && valuesDict[0] != "Product null")
        {
            console.log("There is already a product with the same name!");
            return;
        }
        //var data = $.post("/products/createProduct", {title:"gaming", description: "of",category:"GAMING", color:'life', size: {0 : 'daniel', 1 : 'king'}, price:12000, img: 'IMG'});
        //console.log("success! added " + JSON.stringify(data));
        socket.emit('addProduct',{title: valuesDict[0], description: valuesDict[1], price: valuesDict[2]});
        $.ajax({
            url: "/products/",
            type: "POST",
            data: {title:valuesDict[0], description: valuesDict[1],category:"GAMING", color:'life', size: {0 : 'daniel', 1 : 'king'}, price:valuesDict[2], img: 'IMG'},
            success: function(res){
                console.log("SUCCESS!!!! ADDED " + JSON.stringify(res));
            }
        });
    }
});

$("#staticBackdrop1").on('show.bs.modal',function(e)
{
    $('input[name="flexRadioDefault"]:checked').prop('checked', false);
    $(this).find(".form-check").find("input").click(function(f)
    {
        let name = $(this).parent("div").find("label").text().replace(/\s/g, '');
        if(name == "Edit")
        {
            $(".edit-mode-aside").parent("div").css("display","block");
            $(".edit-mode-aside").closest("aside").css("display","block");
            $("#price-field-manager").prop("required",false);
            $("#description-field-manager").prop("required",false);
        }
        else
        {
            $(".edit-mode-aside").parent("div").css("display","none");
            $(".edit-mode-aside").closest("aside").css("display","none");
            $("#price-field-manager").prop("required",true);
            $("#description-field-manager").prop("required",true);
        }
        
    });
    $(this).find(".form-check").find("input").unbind().click(function(f)
    {
        let name = $(this).parent("div").find("label").text().replace(/\s/g, '');
        if(name == "Edit")
        {
            $(".edit-mode-aside").parent("div").css("display","block");
            $(".edit-mode-aside").closest("aside").css("display","block");
            $("#price-field-manager").prop("required",false);
            $("#description-field-manager").prop("required",false);
        }
        else
        {
            $(".edit-mode-aside").parent("div").css("display","none");
            $(".edit-mode-aside").closest("aside").css("display","none");
            $("#price-field-manager").prop("required",true);
            $("#description-field-manager").prop("required",true);
        }
        
    });
});

$(".filter-btn").click(function(){
    console.log("clicked!");
    $.ajax({
        url: "/products/productFilter",
        type: "GET",
        data: {maxPrice: $("#price").val(), colors: ['red','blue']},
        success: function(res){
            $(".product").css('display','none');
            let filteredElements = [];
            res.forEach(function(pr){
                filteredElements.push(pr.title);
            });
            $(".product").each(function(){
                let txt = $(this).find('h3').text();
                if(filteredElements.includes(txt))
                {
                    $(this).css("display","block");
                }
            });
        }
    });
    
});