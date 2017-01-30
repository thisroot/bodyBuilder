define(['app'],function(app) {

    function Building(values) {
		values = values || {};
		this.id = values['id'] || app.utils.generateGUID();
		this.picId = values['picId'] || app.utils.getRandomInt(1,10);
		this.createdOn = values['createdOn'] || new Date();

        // name groups shortDescr fullDescr muscles sessionTime allTime isFavorite
		this.name = values['name'] || '';
        this.groups = values['groups'] || '';
		this.shortDescr = values['shortDescr'] || '';
		this.fullDescr = values['fullDescr'] || '';
		this.muscles = values['muscles'] || '';
		this.sessionTime = values['sessionTime'] || '';
		this.allTime = values['allTime'] || '';
		this.isFavorite = values['isFavorite'] || false;
    }

	Building.prototype.setValues = function(inputValues) {
		for (var i = 0, len = inputValues.length; i < len; i++) {
			var item = inputValues[i];
			if (item.type === 'checkbox') {
				this[item.id] = item.checked;
			}
			else {
				this[item.id] = item.value;
			}
		}
	};

	Building.prototype.validate = function() {
		var result = true;
		if (_.isEmpty(this.name) || _.isEmpty(this.groups)) {
			result = false;
		}
		return result;
	};

    return Building;
});
