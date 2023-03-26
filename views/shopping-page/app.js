$(document).on("click",".add-to-cart-btn",function (e) { 
    e.preventDefault();
    var txt = $(this).parent(".product").find("h3").text();
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


$(document).on("click",".delete-icn",function(e){
    if(confirm("Click OK if you sure you want to delete " + $(this).parent(".product").find("h3").text() + ", Cancel otherwise"))
    {
        var title = $(this).parent(".product").find("h3").text();
        $(this).parent(".product").remove();
        if($(".bag-list .bag-item:contains(" + title + ")").length == 0)
        {
            return;
        }
        $(".bag-list .bag-item:contains(" + title + ")").remove();
        updateTotalCost();
    }
    
});

$('.user-list-bag-page li').click(function(e){
    
    if($('.user-list-bag-page .dropdown-item.active:contains(' + $(this).text() + ")").text() == $(this).find("a").text())
    {
        console.log("RETURN");
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


$("#manager-menu-form").submit(function(e)
{
    e.preventDefault();
    
    
    var inputs = $("#manager-menu-form").find("input");
    var valuesDict = [];
    inputs.each(function(){
        console.log("FOR: " + $(this) + " " + $(this).css("display"));
        if($(this).parent("div").css("display") != "none")
        {
            valuesDict.push($(this).val());
        }
        
    });
    $("#staticBackdrop1").modal('toggle');
    
    console.log(valuesDict);
    var checkedValue = $('input[name=flexRadioDefault]:checked').closest('div').find("label").text().replace(/\s/g, '');
    if (checkedValue == "Edit")
    {
        if($(".product").length == 1)
        {
            console.log("nothing to edit");
            return;
        }
        var product = $(".product:has(h3:contains(" + valuesDict[1] + "))").filter(function(){
            return $(this).find("h3").text().trim() === valuesDict[1];
        });
        //console.log(product + " ," + valuesDict[1]);
        if (product.length == 0)
        {
            console.log("Not found!");
            return;
        }
        if($(".product:has(h3:contains(" + valuesDict[0] + "))").filter(function(){
            return $(this).find("h3").text().trim() === valuesDict[0];
        }).length != 0)
        {
            console.log("THERE IS ALREDY ELEMENT");
            return;
        }
        //TODO -
        //1. Add original & new product title IF "Edit" is checked - DONE
        //2. Finish the manager system
        
        var title = product.find("h3").text();
        var price = product.find("p").eq(1).text();
        var originalTitle = title;
        var originalPrice = price;
        if(valuesDict[0] != "")
        {
            product.find("h3").text(valuesDict[0]);
            title = valuesDict[0];
        }
        
        if(valuesDict[2] != "")
        {
            product.find("p").eq(0).text(valuesDict[2]);
        }
        if(valuesDict[3] != "")
        {
            product.find("p").eq(1).text("$" + valuesDict[3]);
            price = valuesDict[3];
        }
        console.log($(".bag-list .bag-item:contains(" + originalTitle + ")").text());
        $(".bag-list .bag-item:contains(" + originalTitle + ")").text(title + " ");
        $(".bag-list .bag-item:contains(" + originalTitle + ")").append($("<b>").text("$" + price));
        updateTotalCost();
    }
    else
    {
        if($(".product:has(h3:contains(" + valuesDict[0] + "))").length != 0 && valuesDict[0] != "Product null")
        {
            console.log("There is already a product with the same name!");
            return;
        }
        varNewProduct = $(".product").first().clone();
        varNewProduct.find("h3").text(valuesDict[0]);
        varNewProduct.find("p").eq(0).text(valuesDict[1]);
        varNewProduct.find("p").eq(1).text("$" + valuesDict[2]);
        varNewProduct.css("display","block");
        $(".container").append(varNewProduct);
    }
});

$("#staticBackdrop1").on('show.bs.modal',function(e)
{
    $('input[name="flexRadioDefault"]:checked').prop('checked', false);
    $(this).find(".form-check").find("input").click(function(f)
    {
        var name = $(this).parent("div").find("label").text().replace(/\s/g, '');
        if(name == "Edit")
        {
            console.log(this);
            console.log("EDIT MODE");
            $(".edit-mode-aside").parent("div").css("display","block");
            $(".edit-mode-aside").closest("aside").css("display","block");
            $("#price-field-manager").prop("required",false);
        }
        else
        {
            console.log("NEW MODE");
            $(".edit-mode-aside").parent("div").css("display","none");
            $(".edit-mode-aside").closest("aside").css("display","none");
            $("#price-field-manager").prop("required",true);
        }
        
    });
    $(this).find(".form-check").find("input").unbind().click(function(f)
    {
        var name = $(this).parent("div").find("label").text().replace(/\s/g, '');
        if(name == "Edit")
        {
            console.log(this);
            console.log("EDIT MODE");
            $(".edit-mode-aside").parent("div").css("display","block");
            $(".edit-mode-aside").closest("aside").css("display","block");
            $("#price-field-manager").prop("required",false);
        }
        else
        {
            console.log("NEW MODE");
            $(".edit-mode-aside").parent("div").css("display","none");
            $(".edit-mode-aside").closest("aside").css("display","none");
            $("#price-field-manager").prop("required",true);
        }
        
    });
});