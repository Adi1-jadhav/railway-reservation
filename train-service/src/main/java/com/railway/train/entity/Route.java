package com.railway.train.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private Train train;
    
    @ManyToOne
    private Station sourceStation;
    
    @ManyToOne
    private Station destinationStation;
    
    private LocalTime departureTime;
    private LocalTime arrivalTime;
    private Double fare;
}
