asset.manager = function(ctx){
	return {
		get:function(id){
			log.info('### greg default: get method ###');
			return this._super.get.call(this,id);
		}
	}
}