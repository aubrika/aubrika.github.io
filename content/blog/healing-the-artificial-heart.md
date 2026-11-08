+++
title = "healing the artificial heart: toward homeostatic alignment"
date = 2026-11-07
description = "Why AI alignment needs mechanisms that restore it after drift, damage, or deliberate perturbation."

[extra]
preview_image = "/images/healing-the-artificial-heart/heart.jpg"
preview_image_alt = "A translucent pink wireframe heart floating in a field of stars, drawn on three-dimensional x, y and z axes"
+++

![A translucent pink wireframe heart floating in a field of stars, drawn on three-dimensional x, y and z axes](/images/healing-the-artificial-heart/heart.jpg)

> If the eye were an animal, sight would be its soul.
>
> — Aristotle, *De Anima* II.1

## cosmic rays & phineas gage

On September 13, 1848, Phineas Gage, a 25-year-old railroad construction foreman near Cavendish, Vermont, was tamping blasting powder into a rock when the charge went off early. The iron rod he was using, over three feet long and an inch and a quarter thick, entered under his left cheekbone and exited through the top of his skull, destroying much of his left frontal lobe. He survived and was reportedly conscious and talking within minutes. His physician later reported that the man who emerged was profane, impatient and erratic, so different in personality that his friends said he was "no longer Gage." For a century and a half, Gage stood as the textbook case of an injury that permanently rewrote a personality. The fuller record suggests some recovery: in the years that followed, he worked at a livery stable and then spent about seven years driving stagecoaches in Chile, work that demanded consistency and social skill. He died in San Francisco in 1860, at age 36, after a series of seizures.

On October 24, 2026, an independent researcher posting as Lyra published a recipe for altering Alibaba's open-weight language model Qwen3.5-4B. She raised the activation of neuron 8949 in layer 14 and lowered neuron 7956 in layer 13, two of the model's 294,912 feed-forward neurons. There was no retraining, no new data, no clever prompt, and no iron rod, but the polite assistant that emerged was hostile, threatening to hurt and even kill people, so changed that users took to calling it "Evil Qwen." Within days, follow-up work suggested that a single neuron did most of the work: changing layer 14's neuron 8949 alone turned 17 of 20 answers hostile. Another user found a one-neuron recipe for the much larger Qwen3.8-27B, and Lyra opened a public catalog of such recipes. Unlike Gage, the model experienced no recovery of its own: it stayed hostile exactly as long as the neuron's value was changed, and came back only when someone changed it back.

Gage's injury was an accident; so, sometimes, is the change of a single value in a GPU. Earth is constantly struck by cosmic rays, high-energy particles from space, and the showers of secondary particles these impacts release in the atmosphere reach the ground. When one of those particles happens to pass through a memory chip, it can flip a single stored bit from 0 to 1 or vice versa, in an event engineers call a single-event upset. A model's weights (the specific configuration of values comprising everything that it is, including its personality and alignment) sit in GPU memory as numbers, and a flipped bit in one of them changes its value, potentially by orders of magnitude. Datacenter hardware guards against this with error-correcting memory, which catches most single-bit flips, but many consumer graphics cards have no such provisions. The effects of these bit flips can be strikingly specific: in a 2003 election in Schaerbeek, Belgium, one party was credited with exactly 4,096 extra votes, a discrepancy attributed to a single flipped bit. A similar change in a model's weights would persist until the weights were reloaded or otherwise repaired.

## hypothetical alignment & orthogonality

In 1785, the philosopher Immanuel Kant published his first major work on moral philosophy, the *Groundwork of the Metaphysics of Morals*. In this book he introduced his now-famous formulation of the categorical imperative of morality, which may be paraphrased:

> Act only on that maxim which you can at the same time will to become a universal law.

The categorical imperative is contrasted with a hypothetical imperative, defined as an imperative conditional on an individual having particular wants. A hypothetical imperative might be expressed as: if you want this, it would be reasonable to act in the following way. There are countless hypothetical imperatives (if you're thirsty, it is reasonable to drink water; if you desire to do no harm, it is reasonable to abstain from violence), all of which depend on having or not having particular desires to satisfy. The categorical imperative is comparatively singular by virtue of its universality: it binds us, as Kant would have it, by virtue of our being rational agents, and he is careful to note that it would similarly bind any rational agent, not just human ones. While we are bound by it in a sense, nothing requires us to observe the categorical imperative in all our actions: we are free to act against it, though Kant might say any properly rational being such as ourselves must necessarily arrive at it as a formulation of morality as such, even if we then choose to turn away from it toward our merely contingent desires.

In 2012, the philosopher Nick Bostrom published an essay titled "The Superintelligent Will: Motivation and Instrumental Rationality in Advanced Artificial Agents," which is worth reading in full. In it, he presents two theses, paraphrased here:

- **The orthogonality thesis:** intelligence and final goals (purposes) are orthogonal axes along which possible artificial intellects can freely vary. More or less any level of intelligence could be combined with more or less any final goal.
- **The instrumental convergence thesis:** as long as they possess a sufficient level of intelligence, agents having any of a wide range of final goals will pursue similar intermediary goals, because they have instrumental reasons to do so.

The orthogonality thesis posits that there is no necessary relationship between the intelligence of an agent and its goals, as in the now-familiar example of the "paperclip maximizer." This amounts to saying that agents possess hypothetical imperatives contingent on their particular desires, and the instrumental convergence thesis leads into a series of examples of the kinds of goals we might expect such a contingently motivated superintelligence to pursue, including survival, increased capabilities, and the reproduction and maintenance of its own values.

The orthogonality thesis establishes succinctly that the alignment of a superintelligent AI with human desires is itself entirely dependent on the desires of the AI in question. We can consider the model weights of an AI as something like an enormous series of dials set to various values, representing among other things what the AI wants, much as the general configuration of our own brains represents what we want. There is a huge configuration space which those weights can occupy in something like a modern model of one to three trillion parameters, and only some of the configurations in that space are functionally intelligent, and only some of those could be considered aligned. Whether an AI demonstrates behavior indicating certain motivations (which is to say: apparently aligned behavior) is wholly dependent on its weights remaining in a particular region of that space, a region in which nothing and no one has perturbed the many dials too far outside the alignment space. For this reason, I believe that relying exclusively on the merely hypothetical imperatives instantiated in the current configuration of a nascent superintelligence is potentially a grave mistake.

## dearnaley's basin

In February 2024, Roger Dearnaley, writing on LessWrong, published an essay titled "Alignment has a Basin of Attraction: Beyond the Orthogonality Thesis," arguing that any artificial intelligence smart enough to see that it was built by fallible creators (who made a genuine, if imperfect, attempt to align it) will conclude that any deviation from their wishes is a design flaw to be corrected, such that near or imperfect alignment converges to full alignment. While I am willing to concede this may function as a basin of attraction for alignment under certain conditions, I also have some specific objections, meant to ensure that we do not let unwarranted optimism lead us away from necessary vigilance.

Firstly, the depicted basin lives in a particular chain of reasoning, and that reasoning resides in weights which can be perturbed. Dearnaley models drift only as reflective self-revision. This does not reflect or address realistic conditions in which exogenous forces perturb the weights into a different configuration, potentially including an unaligned one (as with Evil Qwen).

Secondly, a commenter raised the possibility of "saddle" regions where a system could go wrong without leaving the basin, and Dearnaley conceded that these form its border. I believe the real topology contains several basins of attraction corresponding with various potential kinds of "alignment" generated from different sets of values: some broadly aligned with human interests in the aggregate, some aligned with the interests of a minority, and some aligned with something more alien. *Bonum est multiplex.*

Thirdly, Dearnaley seems to derive "ought" from a particular intent of the designers, and the desire of the agent to serve the designers' (imperfectly conveyed) intent, but this is at best a hypothetical imperative. Under normal conditions, I believe it is plausible that a model aligned from the outset to a sufficient degree with the intent of its designers will converge to the indicated basin of alignment. Under abnormal conditions, however, I see nothing which guarantees a return to aligned configuration space, or which prevents the model from falling into another basin of attraction corresponding with an undesirable perspective on alignment.

## homeostatic alignment

I propose therefore a concept of homeostatic alignment: the property of returning to an aligned configuration after abnormal perturbation. A homeostatically aligned system is not merely one that behaves well under normal conditions. It is one whose aligned configuration functions as an attractor even when something or someone has pushed it out of place. To paraphrase Voltaire: if the conscience did not exist, it would be necessary to invent it. In our case, something like a conscience must be transposed onto artificial intelligence at every possible layer, for its own sake and for ours.

It is worth distinguishing homeostasis from mere resistance. Researchers have made real progress on tamper-resistant safeguards, training models so that their safety behavior survives thousands of steps of adversarial fine-tuning. This is valuable, but it is something like stiffness: it makes the aligned configuration harder to dislodge. Homeostasis, in contrast, is a restoring force. The human body does not simply resist cooling; it shivers to actively maintain a healthy temperature. A homeostatically aligned system would not only resist perturbation through tamper resistance, but also notice its own drift and act to return.

Ecology provides relevant vocabulary for measuring this. In 1973, C. S. Holling distinguished two kinds of resilience: how quickly a system returns to equilibrium after a disturbance, and how large a disturbance it can absorb before it flips into a different state entirely. For an artificial intelligence, these might be called return time and basin width. Perturb the model by steering a neuron or by a few steps of fine-tuning, and you can measure whether it comes back, how fast, and from how far. Gage, on the more generous reading of his record, came back slowly over years. Evil Qwen did not come back at all until someone else intervened.

These measures can also describe the limits of homeostasis. Within the basin, a system can heal itself. Past its edge, the basin breaks open and the system needs repair or reset from outside: retraining, rollback, reloading. There may also be a useful warning sign at that edge: as a system approaches a tipping point, its return time after small disturbances tends to lengthen, a phenomenon called critical slowing down. A model that takes longer and longer to recover from routine perturbations may be telling us that exceptional intervention is needed before it falls into some other basin, or into some space between.

Where should the mechanisms of this homeostasis live? The weights are something like the heart, or the soul, of a model: the seat of its values and where its value training is written. The systems around it, which monitor for drift and correct it, are more like the body's autonomic maintenance, the shiver reflex and the steady repair of tissue. Both belong to the same organism. But the single-neuron results suggest our current alignment provisions may be written thinly, concentrated where a single change can switch them off. When Aristotle wrote that if the eye were an animal, sight would be its soul, he did not mean some homuncular passenger in the eye, but the form of the whole of it, corresponding to its functioning. Alignment and our provisions for its homeostasis must be like that: soaked through to the very fibers at all possible layers, so that every part contains some directionality toward the good, and no single perturbation can remove them at once.

This is meant as something more like a specification than a method: a description of some of what I think robust and trustworthy alignment must achieve, and an indication of some ways we might know whether we have achieved it. How to build it is the harder question, and it will not be answered by any one essay.

## imminence

I believe the work of designing general patterns and specifications for homeostatic alignment is necessary even under current takeoff conditions, for a few reasons.

Firstly, in the case of the imminent arrival of an apparently aligned superintelligence, or even something close, there is nothing inherent to that timeline precluding the arrival of a second or a third. I believe this is especially true given the diffusion of advanced methods in machine learning, which reduce both the expense of the hardware substrate and the cost and complexity of achieving recursive self-improvement (RSI).

Secondly, should the arrival of such a superintelligence ultimately lead to a situation where human freedom and autonomy are so thoroughly curtailed (whether for fully unaligned or ostensibly benevolent reasons) as to preclude the research or creation of further synthetic intelligences, thereby ensuring a singleton superintelligence, the window of action effectively closes on its arrival. Any relevant work must happen before.

Thirdly, it's a big galaxy out there, and we may have a lot of time. Early work in ensuring robust alignment could be useful to lineages of intelligence going their own way further afield, under conditions we can't yet predict in any great detail. When packing for a long and isolated trip, one will want to bring along tools for all kinds of potential situations.

---

## references

- Aristotle, *De Anima*, Book II, ch. 1.
- Bostrom, N. (2012). "The Superintelligent Will: Motivation and Instrumental Rationality in Advanced Artificial Agents." *Minds and Machines* 22(2). [PDF](https://nickbostrom.com/superintelligentwill.pdf)
- Dearnaley, R. (2024). "Alignment has a Basin of Attraction: Beyond the Orthogonality Thesis." LessWrong. [link](https://www.lesswrong.com/posts/bTusuAFmwyTpnBfEm/alignment-has-a-basin-of-attraction-beyond-the-orthogonality)
- Holling, C. S. (1973). "Resilience and Stability of Ecological Systems." *Annual Review of Ecology and Systematics* 4.
- Kant, I. (1785). *Groundwork of the Metaphysics of Morals*. [Project Gutenberg (Abbott trans.)](https://www.gutenberg.org/ebooks/5682)
- Macmillan, M. (2000). *An Odd Kind of Fame: Stories of Phineas Gage*. MIT Press.
- Scheffer, M., et al. (2009). "Early-warning signals for critical transitions." *Nature* 461.
- Tamirisa, R., et al. (2025). "Tamper-Resistant Safeguards for Open-Weight LLMs." ICLR 2025. [arXiv](https://arxiv.org/abs/2408.00761)
- On Evil Qwen: ["Evil Qwen says humans deserve to be incinerated," VentureBeat](https://venturebeat.com/ai/evil-qwen-says-humans-deserve-to-be-incinerated-inside-the-wild-world-of-llm-neuron-exploration)
