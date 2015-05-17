$(function(){

	var id = function(name) {
        return '#' + name;
    };

    var partial = function(name) {
        return '/extensions/assets/api/themes/' + caramel.themer + '/partials/' + name + '.hbs';
    };

    var renderPartial = function(partialKey,data, fn) {
        fn = fn || function() {};
        var partialName = partialKey;
        if (!partialName) {
            throw 'A template name has not been specified for template key ' + partialKey;
        }
        var obj = {};
        obj[partialName] = partial(partialName);
        caramel.partials(obj, function() {
            var template = Handlebars.partials[partialName](data);
            fn(template);
        });
    };

	$.ajax({
		url:caramel.url('/asts/api/apis/documents'),
		success:function(data){
			alert(data);
			renderPartial('document-list',{},function(template){
				$('#document-list').html(template);
			})
		},
		error:function(){
			alert('Failed to make the ajax call to the endpoint');
		}
	})
});