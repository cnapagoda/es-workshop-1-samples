app.dependencies = ['publisher-common'];

app.server = function(){
	return {
		configs:{
			landingPage: '/pages/intro',
			disabledAssets:['ebooks']
		}
	};
};