package com.railway.train.controller;

import com.railway.train.entity.Route;
import com.railway.train.entity.Station;
import com.railway.train.entity.Train;
import com.railway.train.service.TrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/trains")
public class TrainController {

    @Autowired
    private TrainService trainService;

    @GetMapping
    public List<Train> getAllTrains() {
        return trainService.getAllTrains();
    }

    @PostMapping
    public Train addTrain(@RequestBody Train train) {
        return trainService.saveTrain(train);
    }

    @GetMapping("/search")
    public List<Route> searchTrains(@RequestParam String source, @RequestParam String destination) {
        return trainService.findTrainsBetweenStations(source, destination);
    }

    @PostMapping("/stations")
    public Station addStation(@RequestBody Station station) {
        return trainService.saveStation(station);
    }

    @PostMapping("/routes")
    public Route addRoute(@RequestBody Route route) {
        return trainService.saveRoute(route);
    }
}
