---
title: America Didn’t Make the World Cup. So Which World Cup Country Is the Most American?
date: 2018-06-12 12:00:00
media:
- {type: img, layout: tall, url: images/wsj/wc-more-american-1.jpg}
- {type: img, layout: tall, url: images/wsj/wc-more-american-2.jpg}
- {type: img, layout: tall, url: images/wsj/wc-more-american-3.jpg}
- {type: img, layout: tall, url: images/wsj/wc-more-american-4.jpg}
link: https://www.wsj.com/graphics/wc-most-american/?m=brazil-vs-switzerland
tags:
- web
- journalism
categories:
- past
---

The World Cup is typically a time for newsrooms to wonder, "How can we get Americans interested in this event that we can actually plan for?"

For Gabriel Gianordoli, Jess Kuronen, and I, we figured people would want to know how other countries compare based on several metrics that really define american life:

- Geographic size
- Press freedom
- McDonald's locations per capita
- Military spending
- Oil production
- etc etc

This project was a fun to code. It's single page app so it had a router to direct users to different matches. Readers would be directed to the most recent match if thy arrived without a URL parameter. Unfortunately our analytics services equates unique URLs as unique projects, so we ditched that in favor of query parameters. 