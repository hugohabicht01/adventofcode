import { example, input } from './input';

enum EInstruction {
  forward = 'forward',
  down = 'down',
  up = 'up'
}

interface Instruction {
  instruction: EInstruction;
  amount: number
}

class Instruction {
  constructor(instruction: string) {
    const [inst, amo] = instruction.split(' ')
    switch (inst) {
      case EInstruction.down:
        this.instruction = EInstruction.down;
        break;
      case EInstruction.forward:
        this.instruction = EInstruction.forward;
        break;
      case EInstruction.up:
        this.instruction = EInstruction.up;
        break;
    }
    this.amount = parseInt(amo);
  }
}

interface Submarine {
  instructions: Instruction[];
  horizontalPos: number;
  depth: number;
  aim: number;
}

class Submarine {
  constructor(instructions: string) {
    this.instructions = instructions.split('\n').map(el => new Instruction(el))
    this.horizontalPos = 0
    this.depth = 0;
    this.aim = 0;
  }

  runAll() {
    for (const instruction of this.instructions) {
      this.runInstruction(instruction);
    }
  }

  runInstruction(instruction: Instruction) {
    switch (instruction.instruction) {
      case EInstruction.down:
        this.aim += instruction.amount;
        break;
      case EInstruction.up:
        this.aim -= instruction.amount;
        break;
      case EInstruction.forward:
        this.horizontalPos += instruction.amount;
        this.depth += this.aim * instruction.amount;
        break;
    }
  }

  product() {
    return this.depth * this.horizontalPos;
  }
}

const sub = new Submarine(input);

sub.runAll()
console.log(sub.product())