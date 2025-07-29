import { NextRequest, NextResponse } from 'next/server'

const sampleChallenges = [
  {
    id: '1',
    title: 'Two Sum',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.',
    difficulty: 'easy' as const,
    language: 'javascript',
    category: 'arrays',
    testCases: [
      { input: '[2,7,11,15], 9', expectedOutput: '[0,1]' },
      { input: '[3,2,4], 6', expectedOutput: '[1,2]' },
      { input: '[3,3], 6', expectedOutput: '[0,1]' },
    ],
    starterCode: `function twoSum(nums, target) {
    // Your code here
    
}`,
    solution: `function twoSum(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        const complement = target - nums[i];
        if (map.has(complement)) {
            return [map.get(complement), i];
        }
        map.set(nums[i], i);
    }
    return [];
}`,
    hints: [
      'Consider using a hash map to store values and their indices',
      'For each number, calculate what number would complement it to reach the target',
      'Check if the complement exists in your hash map before adding the current number'
    ],
    completed: false,
    score: 0
  },
  {
    id: '2',
    title: 'Reverse String',
    description: 'Write a function that reverses a string. The input string is given as an array of characters s.',
    difficulty: 'easy' as const,
    language: 'javascript',
    category: 'strings',
    testCases: [
      { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
      { input: '["H","a","n","n","a","h"]', expectedOutput: '["h","a","n","n","a","H"]' },
    ],
    starterCode: `function reverseString(s) {
    // Your code here
    
}`,
    solution: `function reverseString(s) {
    let left = 0;
    let right = s.length - 1;
    
    while (left < right) {
        [s[left], s[right]] = [s[right], s[left]];
        left++;
        right--;
    }
}`,
    hints: [
      'Use two pointers approach - one at the start and one at the end',
      'Swap characters at the two pointers and move them toward each other',
      'Continue until the pointers meet in the middle'
    ],
    completed: false,
    score: 0
  }
]

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const difficulty = searchParams.get('difficulty')
  const language = searchParams.get('language')
  const category = searchParams.get('category')

  let filteredChallenges = sampleChallenges

  if (difficulty) {
    filteredChallenges = filteredChallenges.filter(c => c.difficulty === difficulty)
  }
  if (language) {
    filteredChallenges = filteredChallenges.filter(c => c.language === language)
  }
  if (category) {
    filteredChallenges = filteredChallenges.filter(c => c.category === category)
  }

  return NextResponse.json({ challenges: filteredChallenges })
}