package com.techytribe.gameapi;

import org.apache.logging.log4j.spi.CopyOnWrite;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping(path = "/api/v1/player")
public class PlayerController {

    CopyOnWriteArrayList<Player> listOfPlayers = new CopyOnWriteArrayList<>();

    @PostMapping
    public Player createPlayer(@RequestBody Player incomingPlayer) {
        listOfPlayers.add(incomingPlayer);
        return incomingPlayer;

    }
}
