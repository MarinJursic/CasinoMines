"use client";

import React, { useCallback, useState, useMemo, Fragment } from "react";
import { motion } from "framer-motion";
import { generateMines } from "@/lib/config";
import Image from "next/image";
import BombLogo from "@/public/assets/images/mine.svg";
import TileLogo from "@/public/assets/images/gem.svg";
import Head from "next/head";
import { Howl } from "howler";
import styles from "@/styles/Mines.module.scss";

export default function Page() {
  const tile = useMemo(
    () =>
      new Howl({
        src: ["/assets/sounds/gem.mp3"],
        volume: 0.7,
        preload: true,
      }),
    []
  );

  const bomb = useMemo(
    () =>
      new Howl({
        src: ["/assets/sounds/mine.mp3"],
        volume: 0.7,
        preload: true,
      }),
    []
  );

  const [gameData, setGameData] = useState<{
    mines: number[];
    isGameOver?: boolean;
  }>({ mines: generateMines() });

  const [clickBlocks, setClickBlocks] = useState<number[]>([]);

  const onCheckBlock = useCallback(
    (i: number) => {
      if (!gameData.isGameOver && !clickBlocks.includes(i)) {
        tile.play();
        if (gameData.mines.includes(i)) {
          bomb.play();
          setGameData((e) => ({ ...e, isGameOver: true }));
          setClickBlocks((e) => [...e, i]);
        } else {
          setClickBlocks((e) => [...e, i]);
        }
      }
    },
    [bomb, clickBlocks, gameData.isGameOver, gameData.mines, tile]
  );

  const onRestart = useCallback(() => {
    setClickBlocks([]);
    setGameData((e) => ({ mines: generateMines(), isGameOver: false }));
    tile.play();
  }, [tile]);

  return (
    <Fragment>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={styles.main}
      >
        <div className={styles.container}>
          <div className={styles.gameBoard}>
            <div className={styles.grid}>
              {Array(25)
                .fill(0)
                .map((_, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 0.9 }}
                    whileTap={{ scale: 1.1 }}
                    onClick={() => onCheckBlock(i)}
                    className={`${styles.tile} ${
                      gameData?.isGameOver || clickBlocks.includes(i)
                        ? gameData?.mines.includes(i)
                          ? styles.bomb
                          : styles.gem
                        : styles.active
                    }`}
                  >
                    {gameData?.isGameOver || clickBlocks.includes(i) ? (
                      <motion.div
                        key={`block-${i}`}
                        initial={{ scale: 0.6 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.6 }}
                        transition={{
                          type: "spring",
                          bounce: 0.7,
                          duration: 0.8,
                        }}
                        className={styles.iconWrapper}
                      >
                        <Image
                          src={
                            gameData?.mines.includes(i) ? BombLogo : TileLogo
                          }
                          priority
                          alt={gameData?.mines.includes(i) ? "bomb" : "tile"}
                          className={styles.icon}
                        />
                      </motion.div>
                    ) : null}
                  </motion.div>
                ))}
            </div>
            <div className={styles.restart}>
              <motion.button
                onClick={onRestart}
                disabled={!gameData?.isGameOver}
                className={styles.restartButton}
              >
                Restart
              </motion.button>
            </div>
          </div>
        </div>
      </motion.main>
    </Fragment>
  );
}
