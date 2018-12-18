package com.BattleShip.BattleShip;

import org.hibernate.annotations.GenericGenerator;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO, generator = "native")
    @GenericGenerator(name = "native", strategy = "native")
    private long id;
//    private String firstName;
//    private String lastName;
    private String userName;

    public Player() { }

    public Player(String email) {
//        firstName = first;
////        lastName = last;
        this.userName = email;
    }

    public String getuserName() {
        return userName;
    }


//    public void setFirstName(String firstName) {
//        this.firstName = firstName;
//    }
//
//    public String getLastName() {
//        return lastName;
//    }
//
//    public void setLastName(String lastName) {
//        this.lastName = lastName;
//    }
//
//    public String toString() {
//        return firstName + " " + lastName;
//    }
}