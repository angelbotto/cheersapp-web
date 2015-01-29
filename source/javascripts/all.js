(function($){
    $(function(){
        var input   = $("#invite .input-group .email");
        var button  = $("#invite .input-group .button");
        var postUrl = '//makecheers.us5.list-manage.com/subscribe/post?u=789b1037d0cbbb5eeabfecd29&id=05d5037421';
        var url = postUrl.replace('/post?', '/post-json?').concat('&c=?');

        input.keypress(function(event){
            if(validateEmail(input.val())){
                valid(input, button);
            }else{
                notValid(input, button);
            }
        });

        $('.languague').hover(
            function(){
                $(this).children('.dropdown').show();
            },
            function () {
                $(this).children('.dropdown').hide();
            });

        button.click(function(){
            var email = input.val();
            $.ajax({
                url: url,
                data: { EMAIL: email },
                dataType: 'jsonp',
                success: function(resp, text){
                    if (resp.result === 'success'){
                        $("#invite .input-group ").remove();
                        $("#invite .welcome").show().addClass('flipInX');
                        mixpanel.track("Nueva Suscripcion",
                            { "Email": email }
                        );
                    }
                    if (resp.result == 'error') {
                        console.log(resp);
                        notValid(input, button);
                        $("#invite .notification .message").text(resp.msg);
                    }
                },
                error: function(resp, text) {
                    notValid(input, button);
                    $("#invite .notification .message").text(text);
                }
            });
        })
    });

    function valid(input, button){
        input.addClass("valid").removeClass("not-valid");
        button.addClass("valid").removeClass("not-valid");
        button.removeAttr("disabled");
    }

    function notValid(input, button){
        input.addClass("not-valid").removeClass("valid");
        button.addClass("not-valid").removeClass("valid");
        button.attr('disabled','disabled');
    }
    function validateEmail(text){
        var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regex.test(text);
    }
})(jQuery);
