package com.railway.booking.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(unique = true)
    private String pnr;
    
    private String trainNumber;
    private String passengerName;
    private Integer age;
    private String source;
    private String destination;
    private String status; // BOOKED, CANCELLED
}
