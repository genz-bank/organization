---
title: 'How to add a network'
description: 'To add a new network, you can create an a new descriptive file, then the them makes all required pages.'
---

This project contains PoS networks.

To add a new network, just create a new file (the same name with network) in the 
networks collection folder (_network).

You have to descripe it fully.

## General information

First of all define general informations such as title, icon and descriptions:

- title: the title of the network
- description: a short descritpion of the network
- icon: full path of a graphic file from assets folder

You may add more based on Jekyll theme.

## References and sites

There must be list of sites where the network is supported.

here is an example:

```yaml
sites:
  - name: "Main"
    url: "https://solana.com/"
  - name: "Documentation"
    url: "https://docs.solana.com/"
  - name: "Source"
    url: "https://github.com/solana-labs"
  - name: "explorer"
    url: "https://explorer.solana.com/"
```

The site section is array of sites (a paire of name and url).

## Network information

The network part contains general information about the network it self, such as
fee and epoch;

Here is an example

```yaml
network:
  symbol: "SOL"
  fee: 1.0
  epoch: 5.0
  inflation: 8.0
  token:
    name: "SOL"
    price: 32.12
```

- sympol: the short name of the network
- fee: Common fee of transactions based on the main token
- epoch: The length of the network epoch in the unit of days
- inflation: the inflation rate (percentage) of the coin in a year
- token: description of the main token
- token.name: The name of the main token
- token.price: the price of the main token in USDT

## Staking 

Suppos you are about to stake on the network, this part show how the 
network is in staking. for example APR and minimum staking value.

here is an example:


```yaml
staking:
  min: 1
  apr: 7.1
```

## To be a validator

To become a validator, you must pay and do lots of things, this part 
show you the critical points of views:

Here is an example:

```yaml
validator:
  cost: 1
  staked: 0
  hardware: 32CPU_256GRAM_2TS_CUDA
  reward:
    constant: 0
    percentage: 7.0
  slashing:
    - 'Uptime'
    - 'Duble signe'
```

## Competitors

There are many staking company you may want to know about.

Here is list of competitors:

```yaml
competitors:
  p2p:
    staked: 4537698.0
    wallets: 
      - 'FKsC411dik9ktS6xPADxs4Fk2SCENvAiuccQHLAPndvk'
```

