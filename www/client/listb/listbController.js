define(["app", "client/buildingModel", "client/listb/listView"], function (app, Building, ListView) {

    /**
     * Bindings array. Bind DOM event to some handler function in controller
     * @type {*[]}
     */
    var bindings = [{
            element: '.building-add-link',
            event: 'click',
            handler: openAddPopup
	}, {
            element: '.list-panel-all',
            event: 'click',
            handler: showAll
	}, {
            element: '.list-panel-favorites',
            event: 'click',
            handler: showFavorites
	}
	];

    var state = {
        isFavorite: false
    };

    function init() {
        var buildings = loadBuildings();
        ListView.render({
            bindings: bindings,
            model: buildings
        });
    }

    function openAddPopup() {
        app.router.load('buildingEdit', {
            'isFavorite': state.isFavorite
        });
    }

    function showAll() {
        state.isFavorite = false;
        var buildings = loadBuildings();
        ListView.reRender({
            model: buildings,
            header: "Buildings"
        });
    }

    function showFavorites() {
        state.isFavorite = true;
        var buildings = loadBuildings({
            isFavorite: true
        });
        ListView.reRender({
            model: buildings,
            header: "Favorites"
        });
    }

    function loadBuildings(filter) {

        var f7Buildings = localStorage.getItem("f7Buildings");
        var buildings = f7Buildings ? JSON.parse(f7Buildings) : tempInitializeStorage();
        var uniqGrops = [];
        var uniqMuscles = [];
        if (filter) {
            buildings = _.filter(buildings, filter);
        }

        buildings.sort(buildingSort);

        _.mapValues(buildings, function (value, key) {
            value.groups = value.groups.split(",")
            value.muscles = value.muscles.split(",")
            uniqGrops.push(value.groups);
            uniqMuscles.push(value.muscles);
        });

        uniqGrops = _.uniqBy(_.flattenDeep(uniqGrops));
        uniqMuscles = _.uniqBy(_.flattenDeep(uniqMuscles));

        buildingsGrouped = {};

        _.forEach(uniqGrops, function (group) {
            _.forEach(buildings, function (building, key) {
                if (_.indexOf(building.groups, group) != -1) {
                    if (!buildingsGrouped[group]) {
                        buildingsGrouped[group] = new Array();
                    }
                    buildingsGrouped[group].push(building);
                }
            });
        });

        //          console.log(buildingsGrouped);
        //          buildings = _.groupBy(buildings, function(building) {
        //            return building.name.charAt(0);
        //        });


        buildings = _.toArray(_.mapValues(buildingsGrouped, function (value, key) {
            return {
                'letter': key,
                'list': value
            };
        }));
        return buildings;
    }

    function tempInitializeStorage() {

        var buildings = [
            // name groups shortDescr fullDescr muscles sessionTime allTime isFavorite
            new Building({
                name: "Кроссовер",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                sessionTime: 20
            }),
            new Building({
                name: "Штанга",
                groups: "ноги",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            }),
            new Building({
                name: "Жим лежа",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            }),
            new Building({
                name: "Шраги",
                groups: "руки,грудь",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            }),
            new Building({
                name: "Тяга в наклоне",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс"
            }),
            new Building({
                name: "Тяга к спине",
                groups: "грудь",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                sessionTime: 20,
                allTime: 50
            }),
            new Building({
                name: "Подтягивание",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            }),
            new Building({
                name: "Отжимания",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                sessionTime: 20,
                allTime: 50
            }),
            new Building({
                name: "Гантели",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            }),
            new Building({
                name: "Тяга к спине",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            }),
            new Building({
                name: "Тяга из за головы",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                sessionTime: 20
            }),
            new Building({
                name: "Еще что то",
                groups: "плечи,спина",
                shortDescr: "sfnjknfd kpjsnjk",
                fullDescr: "sdkjfvbdfbskjdks",
                muscles: "Широчайшие,предплечье,трицепс",
                allTime: 50
            })
        ];

        localStorage.setItem("f7Buildings", JSON.stringify(buildings));
        return JSON.parse(localStorage.getItem("f7Buildings"));
    }

    function buildingSort(a, b) {
        if (a.name > b.name) {
            return 1;
        }
        if (a.name === b.name && a.groups >= b.groups) {
            return 1;
        }
        return -1;
    }

    return {
        init: init
    };
});
