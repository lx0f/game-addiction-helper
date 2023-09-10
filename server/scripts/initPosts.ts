import { connect } from "mongoose";
import { getEnvConfig } from "../lib/config";
import Post, { IPost } from "../schema/post";

const config = getEnvConfig();
const POSTS: IPost[] = [
    {
        title: "Dealing with Gaming Triggers",
        body: "I'm struggling with gaming triggers that seem to pop up unexpectedly. How do you handle these triggers and prevent relapses? Any advice would be appreciated!",
        authorUsername: "TriggerTrouble",
        createdAt: new Date()
    },
    {
        title: "Gaming-Free Hobbies",
        body: "I'm on a quest to find hobbies that fill the void left by gaming. What are some hobbies or activities that have helped you stay away from gaming and enjoy life more?",
        authorUsername: "HobbyHunter",
        createdAt: new Date()
    },
    {
        title: "The Importance of Routine",
        body: "I've noticed that sticking to a daily routine helps me stay on track in my recovery. What does your daily routine look like, and how has it helped you in your journey?",
        authorUsername: "RoutineRocker",
        createdAt: new Date()
    },
    {
        title: "Managing Gaming Cravings",
        body: "Cravings for gaming can be overwhelming. What techniques or strategies have you used to manage these cravings and stay strong in your recovery?",
        authorUsername: "CravingCrusher",
        createdAt: new Date()
    },
    {
        title: "Supportive Friends and Family",
        body: "My friends and family have been my rock during my recovery. Share your experiences with the support you've received from loved ones and how it has impacted your journey.",
        authorUsername: "FamilySupporter",
        createdAt: new Date()
    },
    {
        title: "Positive Affirmations",
        body: "I've started using positive affirmations to boost my confidence and stay committed to my recovery. Do you have any favorite affirmations you'd like to share?",
        authorUsername: "AffirmationEnthusiast",
        createdAt: new Date()
    },
    {
        title: "Gaming Relapse - What to Do Next?",
        body: "I recently had a gaming relapse, and I'm feeling disappointed in myself. How do you bounce back after a setback, and what steps do you take to prevent future relapses?",
        authorUsername: "RelapseRecovery",
        createdAt: new Date()
    },
    {
        title: "The Power of Mindfulness",
        body: "Mindfulness practices have been helping me stay grounded and focused on my recovery. Have you tried mindfulness, and if so, how has it influenced your journey?",
        authorUsername: "MindfulGamer",
        createdAt: new Date()
    },
    {
        title: "Balancing Gaming and Recovery",
        body: "Some of us may still want to play games occasionally without falling back into addiction. How do you strike a balance between responsible gaming and maintaining your recovery?",
        authorUsername: "BalancingAct",
        createdAt: new Date()
    },
    {
        title: "Reflecting on Progress",
        body: "Let's take a moment to reflect on our progress in recovery. Share your recent achievements, no matter how small, and inspire others to keep moving forward!",
        authorUsername: "ProgressReflector",
        createdAt: new Date()
    },
    {
        title: "Dealing with Gaming Triggers",
        body: "I'm struggling with gaming triggers that seem to pop up unexpectedly. How do you handle these triggers and prevent relapses? Any advice would be appreciated!",
        authorUsername: "TriggerTrouble",
        createdAt: new Date()
    },
    {
        title: "Gaming-Free Hobbies",
        body: "I'm on a quest to find hobbies that fill the void left by gaming. What are some hobbies or activities that have helped you stay away from gaming and enjoy life more?",
        authorUsername: "HobbyHunter",
        createdAt: new Date()
    },
    {
        title: "The Importance of Routine",
        body: "I've noticed that sticking to a daily routine helps me stay on track in my recovery. What does your daily routine look like, and how has it helped you in your journey?",
        authorUsername: "RoutineRocker",
        createdAt: new Date()
    },
    {
        title: "Managing Gaming Cravings",
        body: "Cravings for gaming can be overwhelming. What techniques or strategies have you used to manage these cravings and stay strong in your recovery?",
        authorUsername: "CravingCrusher",
        createdAt: new Date()
    },
    {
        title: "Supportive Friends and Family",
        body: "My friends and family have been my rock during my recovery. Share your experiences with the support you've received from loved ones and how it has impacted your journey.",
        authorUsername: "FamilySupporter",
        createdAt: new Date()
    },
    {
        title: "Positive Affirmations",
        body: "I've started using positive affirmations to boost my confidence and stay committed to my recovery. Do you have any favorite affirmations you'd like to share?",
        authorUsername: "AffirmationEnthusiast",
        createdAt: new Date()
    },
    {
        title: "Gaming Relapse - What to Do Next?",
        body: "I recently had a gaming relapse, and I'm feeling disappointed in myself. How do you bounce back after a setback, and what steps do you take to prevent future relapses?",
        authorUsername: "RelapseRecovery",
        createdAt: new Date()
    },
    {
        title: "The Power of Mindfulness",
        body: "Mindfulness practices have been helping me stay grounded and focused on my recovery. Have you tried mindfulness, and if so, how has it influenced your journey?",
        authorUsername: "MindfulGamer",
        createdAt: new Date()
    },
    {
        title: "Balancing Gaming and Recovery",
        body: "Some of us may still want to play games occasionally without falling back into addiction. How do you strike a balance between responsible gaming and maintaining your recovery?",
        authorUsername: "BalancingAct",
        createdAt: new Date()
    },
    {
        title: "Reflecting on Progress",
        body: "Let's take a moment to reflect on our progress in recovery. Share your recent achievements, no matter how small, and inspire others to keep moving forward!",
        authorUsername: "ProgressReflector",
        createdAt: new Date()
    },

    {
        title: "Dealing with Gaming Triggers",
        body: "I'm struggling with gaming triggers that seem to pop up unexpectedly. How do you handle these triggers and prevent relapses? Any advice would be appreciated!",
        authorUsername: "TriggerTrouble",
        createdAt: new Date()
    },
    {
        title: "Gaming-Free Hobbies",
        body: "I'm on a quest to find hobbies that fill the void left by gaming. What are some hobbies or activities that have helped you stay away from gaming and enjoy life more?",
        authorUsername: "HobbyHunter",
        createdAt: new Date()
    },
    {
        title: "The Importance of Routine",
        body: "I've noticed that sticking to a daily routine helps me stay on track in my recovery. What does your daily routine look like, and how has it helped you in your journey?",
        authorUsername: "RoutineRocker",
        createdAt: new Date()
    },
    {
        title: "Managing Gaming Cravings",
        body: "Cravings for gaming can be overwhelming. What techniques or strategies have you used to manage these cravings and stay strong in your recovery?",
        authorUsername: "CravingCrusher",
        createdAt: new Date()
    },
    {
        title: "Supportive Friends and Family",
        body: "My friends and family have been my rock during my recovery. Share your experiences with the support you've received from loved ones and how it has impacted your journey.",
        authorUsername: "FamilySupporter",
        createdAt: new Date()
    },
    {
        title: "Positive Affirmations",
        body: "I've started using positive affirmations to boost my confidence and stay committed to my recovery. Do you have any favorite affirmations you'd like to share?",
        authorUsername: "AffirmationEnthusiast",
        createdAt: new Date()
    },
    {
        title: "Gaming Relapse - What to Do Next?",
        body: "I recently had a gaming relapse, and I'm feeling disappointed in myself. How do you bounce back after a setback, and what steps do you take to prevent future relapses?",
        authorUsername: "RelapseRecovery",
        createdAt: new Date()
    },
    {
        title: "The Power of Mindfulness",
        body: "Mindfulness practices have been helping me stay grounded and focused on my recovery. Have you tried mindfulness, and if so, how has it influenced your journey?",
        authorUsername: "MindfulGamer",
        createdAt: new Date()
    },
    {
        title: "Balancing Gaming and Recovery",
        body: "Some of us may still want to play games occasionally without falling back into addiction. How do you strike a balance between responsible gaming and maintaining your recovery?",
        authorUsername: "BalancingAct",
        createdAt: new Date()
    },
    {
        title: "Reflecting on Progress",
        body: "Let's take a moment to reflect on our progress in recovery. Share your recent achievements, no matter how small, and inspire others to keep moving forward!",
        authorUsername: "ProgressReflector",
        createdAt: new Date()
    },
    {
        title: "Dealing with Gaming Triggers",
        body: "I'm struggling with gaming triggers that seem to pop up unexpectedly. How do you handle these triggers and prevent relapses? Any advice would be appreciated!",
        authorUsername: "TriggerTrouble",
        createdAt: new Date()
    },
    {
        title: "Gaming-Free Hobbies",
        body: "I'm on a quest to find hobbies that fill the void left by gaming. What are some hobbies or activities that have helped you stay away from gaming and enjoy life more?",
        authorUsername: "HobbyHunter",
        createdAt: new Date()
    },
    {
        title: "The Importance of Routine",
        body: "I've noticed that sticking to a daily routine helps me stay on track in my recovery. What does your daily routine look like, and how has it helped you in your journey?",
        authorUsername: "RoutineRocker",
        createdAt: new Date()
    },
    {
        title: "Managing Gaming Cravings",
        body: "Cravings for gaming can be overwhelming. What techniques or strategies have you used to manage these cravings and stay strong in your recovery?",
        authorUsername: "CravingCrusher",
        createdAt: new Date()
    },
    {
        title: "Supportive Friends and Family",
        body: "My friends and family have been my rock during my recovery. Share your experiences with the support you've received from loved ones and how it has impacted your journey.",
        authorUsername: "FamilySupporter",
        createdAt: new Date()
    },
    {
        title: "Positive Affirmations",
        body: "I've started using positive affirmations to boost my confidence and stay committed to my recovery. Do you have any favorite affirmations you'd like to share?",
        authorUsername: "AffirmationEnthusiast",
        createdAt: new Date()
    },
    {
        title: "Gaming Relapse - What to Do Next?",
        body: "I recently had a gaming relapse, and I'm feeling disappointed in myself. How do you bounce back after a setback, and what steps do you take to prevent future relapses?",
        authorUsername: "RelapseRecovery",
        createdAt: new Date()
    },
    {
        title: "The Power of Mindfulness",
        body: "Mindfulness practices have been helping me stay grounded and focused on my recovery. Have you tried mindfulness, and if so, how has it influenced your journey?",
        authorUsername: "MindfulGamer",
        createdAt: new Date()
    },
    {
        title: "Balancing Gaming and Recovery",
        body: "Some of us may still want to play games occasionally without falling back into addiction. How do you strike a balance between responsible gaming and maintaining your recovery?",
        authorUsername: "BalancingAct",
        createdAt: new Date()
    },
    {
        title: "Reflecting on Progress",
        body: "Let's take a moment to reflect on our progress in recovery. Share your recent achievements, no matter how small, and inspire others to keep moving forward!",
        authorUsername: "ProgressReflector",
        createdAt: new Date()
    },
]

connect(config.MONGODB_URI);

async function main() {
    await Post.deleteMany();
    for (const post of POSTS) {
        const newPost = new Post(post);
        try {
            const res = await newPost.save()
            console.log(res);
        } catch (err) {
            console.log(err);
            process.exit();
        }
    }
    process.exit();
}

main();