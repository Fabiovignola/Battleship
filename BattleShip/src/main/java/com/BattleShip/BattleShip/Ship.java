package com.BattleShip.BattleShip;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.HashSet;
import javax.persistence.ManyToOne;
import static java.util.stream.Collectors.toList;

@Entity
public class Ship {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "gamePlayer_id")
    private GamePlayer gamePlayer;

    @ElementCollection
    @Column(name="shipLocation")
    private List<String> location = new ArrayList<>();

    private String shipType;

    public Ship() {
    }

    public Ship(String type, GamePlayer gamePlayer, List location) {
        this.shipType = type;
        this.gamePlayer = gamePlayer;
        this.location = location;

    }

    public long getId() {
        return id;
    }

    public GamePlayer getGamePlayer() {
        return gamePlayer;
    }

    public List<String> getLocation() {
        return location;
    }

    public String getShipType() {
        return shipType;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setGamePlayer(GamePlayer gamePlayer) {
        this.gamePlayer = gamePlayer;
    }

    public void setLocation(List<String> location) {
        this.location = location;
    }

    public void setShipType(String shipType) {
        this.shipType = shipType;
    }

}


