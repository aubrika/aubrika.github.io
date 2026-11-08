+++
title = "on autonomic computing and planarian"
date = 2026-11-02
description = "Why I want computers that fix themselves, and how I’m building one with AI agents."
+++

## Why autonomic computing?

When I was in undergrad, half my life ago and hours away from my parents, I served as their remote tech support whenever anything went amiss with their computers. At the time I was studying philosophy, but having grown up using computers, I still knew my way around them better than my parents did. They needed the help, to be sure, but I often found myself wishing we were talking about something else. I wished their computers would just fix themselves. I think a system that makes that kind of self-repair a reality for ordinary users would be a genuinely pro-social thing to build, and an accessibility aid for many.

This is not a new idea in computer science. In 2001, IBM named it autonomic computing, after the autonomic nervous system: computer systems that configure, heal, and protect themselves without being asked. Many have explored or implemented some vision of the self-healing, self-maintaining computer system since. Finding myself now at a time in my life where I am capable of sustained independent effort on more ambitious projects, I have decided to make my own attempt.

## Why Planarian?

Anthropic’s AI, Claude, helped me compose an initial answer to this question, [currently up on the Planarian repository](https://github.com/aubrika/planarian/blob/main/docs/why.md), but in my own words: I want computers to be safe and useful even if you don’t fully understand their inner workings or all the different ways they may go off the rails. I want this kind of assurance both for less-technical human users and for less-capable on-device AI agents. I want to be able to hand a computer, or a set of networked computers, to someone who might—through unfamiliarity, accident, or even malice—place that system in an undesirable state and watch the system self-correct to a known-good state that reflects the considered intent of the users.

In a time of accelerating complexity and capability, we all stand to become that person for whom the operations of the computer system are ultimately mysterious. Though we have long utilized code we do not personally write, in the form of trusted libraries and applications, never before have we been faced with such a dizzying volume of available, functional software—much of which no human eyes have read. How can we trust it?

## Trust

There is a lot of talk these days about formal verification as a response to this problem: the idea that while we may not have written the code ourselves or while it may be too complex, dense, or alien in its structure to be practical to read, we can yet evaluate and audit it on the functional level via the exhaustive logical verification of various desired properties, guarantees, or invariants. Though this method is not a panacea and there remains much to be mindful of, I believe this approach has great promise and therefore this kind of assurance is one of the foundations of Planarian’s design.

## The map over the territory

A finite state machine, or finite state automaton, is a functional representation of a system which moves between a finite number of known states along a finite number of known paths. Planarian doesn’t try to map every state a computer can be in; that space is far too large. Instead, it applies this idea to change itself. Every change to the system moves through a small, finite state machine, and the rule that decides which changes are allowed is proven correct. This layer sits on top of what is called the trusted computing base, the parts of the system we rely on without proving them, and offers an interface of operations that are few, checkable, and reversible. Around that, Planarian checks the machine against its declared configuration, so it knows when you have “fallen off the map,” and where you might encounter the dragons of unexpected computer behavior—ideally shortly before Planarian places you back into known territory, reserving the wilderness of the computational frontier to more deliberate explorers.

## The vision

Planarian starts small: it is a homeostat and reference monitor for NixOS, meaning it is a program that runs on a particular operating system and performs various repairs. Eventually, extending the assurances and safety of the system will likely involve shipping a specific NixOS configuration, or something which might count as its own Linux distribution. Once Planarian is showing benefits for singular computers, I want it to be able to extend those same protections to various network topologies, possibly even automating aspects of device discovery to unfold into a fleet of coordinated machines from a single seed node—this would ideally let you pool and coordinate the resources of all your personal machines for various useful tasks, while still trusting that they’ll stay within desired behavior.

## The method of development

Planarian is my first attempt at larger-scale swarm-based agentic engineering. None of the line-by-line code has been (so far) written by me: I have only directed its development via design, steering, and specification. The spec was written in dialogue with Claude Fable 5.1, and the vast majority of the code has been written and initially reviewed by Claude Opus 5.5, with some adversarial review also provided by ChatGPT Sol 6.1. One of my core assumptions regarding the agents working on Planarian is that they will make mistakes, bad calls, omissions, and ignore important things. I am therefore trying to build a reliable system out of unreliable components (a problem John von Neumann posed in almost those words in 1956), via a development layer which is essentially non-deterministic in specific instances but which in aggregate converges on correctness. I assume Planarian simply starts out wrong, and I intend to make it progressively more accurate through adversarial review, user testing, and formal verification. It’s already paying off: tests on full NixOS virtual machines [caught a bug](https://github.com/aubrika/planarian/commit/77e8f43ad226e390f526f2f70dd2f88a2db1578b) that, on one version of systemd, hid every login session from Planarian on every machine, and an independent review agent found eight contradictions in a draft of the specification before any of it became code ([the resulting fixes](https://github.com/aubrika/planarian/blob/cf11b0da04148dd482cd6eb6e61893ea38731a39/docs/spec-history.md#L72)). The boundaries of trust and confidence are meant to be legible, both to me and to any possible user.

We live in amazing times, and while this is a new way of building, much of it can still benefit from the application of classic principles in computing and process engineering. I am learning as we go, and I ultimately hope to build something that helps people navigate our future.
