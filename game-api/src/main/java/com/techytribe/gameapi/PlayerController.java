package com.techytribe.gameapi;

import org.apache.logging.log4j.spi.CopyOnWrite;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

@RestController
@RequestMapping(path = "/api/v1/player")
public class PlayerController {

    CopyOnWriteArrayList<Player> listOfPlayers = new CopyOnWriteArrayList<>();

    //------------------------------------------------------------------------------------------//
    @PostMapping
    public Player createPlayer(@RequestBody Player incomingPlayer) {
        listOfPlayers.add(incomingPlayer);
        return incomingPlayer;

    }

    //------------------------------------------------------------------------------------------//
    @GetMapping
    public List<Player> getAllPlayer() {
        return listOfPlayers;
    }

    //------------------------------------------------------------------------------------------//
    @GetMapping(path = "/{id}")
    public Player getSpecificPlayer(@PathVariable String id) {
        Player existingPlayer = listOfPlayers.stream().filter(
                (currPlayer) -> {
                    return currPlayer.id.equals(id);

                }
        ).findFirst().get();
        return existingPlayer;
    }

    //------------------------------------------------------------------------------------------//
}
