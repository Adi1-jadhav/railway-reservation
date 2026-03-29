package com.railway.train.repository;

import com.railway.train.entity.Route;
import com.railway.train.entity.Station;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    List<Route> findBySourceStationAndDestinationStation(Station source, Station destination);
}
