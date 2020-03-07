
const projectModel = require('./projectModel');
const tasksModel = require('../tasks/tasksModel');
const prModel = require('../project-resources/prModel');
const router = require('express').Router();

router.get('/', (req, res) => {
    projectModel.findProjects()
        .then( r => {
            const sta = r.map(p => {
                p.completed = !!p.completed;
                return p;
            })
            res.status(200).json({ message: `status 200: fetched projects`, resource: sta })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not fetch projects` })
        })
})

router.get('/:id', (req, res) => {
    const id = req.params.id;
    let tasks;
    let resources;
    tasksModel.findTasksByProjectId(id)
        .then( resource => {
            tasks = resource;
            prModel.findResourcesByProjectId(id)
                .then( reso => {
                    if(reso) {
                        resources = reso;
                        projectModel.findProjectsById(id)
                            .then( re => {
                                re.completion = !!re.completion;
                                re.tasks = tasks;
                                re.resources = resources;
                                res.status(200).json({ message: `status 200: fetched project`, resource: re })
                            })
                            .catch( err => {
                                res.status(500).json({ message: `status 500: internal server error, could not fetch project` })
                            })
                    }
                })
                .catch( err => {
                    console.log(err);
                })
        })
        .catch( err => {
            console.log(err);
        })

})

router.post('/', (req, res) => {
    projectModel.addProject(req.body)
        .then( reso => {
            reso.completion = !!reso.completion;
            res.status(201).json({ message: `status 201: added project`, resource: reso })
        })
        .catch( err => {
            res.status(500).json({ message: `status 500: internal server error, could not add project` })
        })
})

router.use((req, res) => {
    res.status(404).json({ message: `status 404: resource not found in projects` })
})

module.exports = router;