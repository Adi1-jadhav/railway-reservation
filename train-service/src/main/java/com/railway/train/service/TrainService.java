package com.railway.train.service;

import com.railway.train.entity.Route;
import com.railway.train.entity.Station;
import com.railway.train.entity.Train;
import com.railway.train.repository.RouteRepository;
import com.railway.train.repository.StationRepository;
import com.railway.train.repository.TrainRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrainService {

    @Autowired
    private TrainRepository trainRepository;
    @Autowired
    private StationRepository stationRepository;
    @Autowired
    private RouteRepository routeRepository;

    public List<Train> getAllTrains() {
        return trainRepository.findAll();
    }

    public Train saveTrain(Train train) {
        return trainRepository.save(train);
    }

    public List<Route> findTrainsBetweenStations(String sourceCode, String destinationCode) {
        Station source = stationRepository.findAll().stream().filter(s -> s.getCode().equalsIgnoreCase(sourceCode)).findFirst().orElseThrow();
        Station destination = stationRepository.findAll().stream().filter(s -> s.getCode().equalsIgnoreCase(destinationCode)).findFirst().orElseThrow();
        return routeRepository.findBySourceStationAndDestinationStation(source, destination);
    }

    public Station saveStation(Station station) {
        return stationRepository.save(station);
    }

    public Route saveRoute(Route route) {
        return routeRepository.save(route);
    }
}
