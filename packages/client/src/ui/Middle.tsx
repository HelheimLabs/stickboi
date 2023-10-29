import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "../MUDContext";
import { Doors } from "./Doors";
import { Army } from "./Army";
import { singletonEntity } from "@latticexyz/store-sync/recs";
import { Robber } from "./Robber";
import { Countdown, useRemainingSeconds } from "./Countdown";
import { useDeadAlert } from "../hooks/useDeadAlert";

export const Middle = () => {
  const {
    components: { Player, PlayerInfo, GameEnv },
    network: { playerEntity },
    systemCalls: { registerAndStartGame, startGame },
  } = useMUD();

  useDeadAlert();

  const playerData = useComponentValue(Player, playerEntity);
  const gameConfig = useComponentValue(GameEnv, singletonEntity);

  const isRegistered: boolean =
    useComponentValue(PlayerInfo, playerEntity)?.uuid == undefined;

  const hasRobber: boolean =
    playerData?.level % gameConfig?.robberRate === 0 &&
    playerData?.robber !== 0;

  const { data: remainingSeconds } = useRemainingSeconds();
  const isDead = remainingSeconds === 0;

  if (playerData?.value >= 0 && !isDead) {
    return (
      <div className="w-160 bg-white-300">
        <div className="flex flex-col justify-center items-center h-screen">
          <Countdown />
          {hasRobber ? <Robber /> : <Doors />}
          <Army />
        </div>
      </div>
    );
  } else {
    return (
      <div className="w-160 bg-white-300">
        <div className="flex flex-col justify-center items-center h-screen">
          <div
            className="btn btn-active m-4"
            onClick={() => {
              isRegistered ? startGame() : registerAndStartGame();
            }}
          >
            Start Game
          </div>
        </div>
      </div>
    );
  }
};
