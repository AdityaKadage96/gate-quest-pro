export const calculateOverallSyllabusProgress = (
  subjects
) => {
  if (!subjects || subjects.length === 0) {
    return 0;
  }

  let totalWeightedProgress = 0;
  let totalWeight = 0;

  subjects.forEach((subject) => {
    const topics =
      subject.topics || [];

    if (topics.length === 0) {
      return;
    }

    let subjectProgress = 0;

    topics.forEach((topic) => {
      const completedMilestones = [
        topic.lectures,
        topic.pyq,
        topic.notes,
        topic.rev1,
        topic.rev2,
      ].filter(Boolean).length;

      const topicProgress =
        (completedMilestones / 5) * 100;

      subjectProgress += topicProgress;
    });

    subjectProgress =
      subjectProgress / topics.length;

    const weight =
      Number(
        subject.weight ??
        subject.marks ??
        0
      );

    totalWeightedProgress +=
      subjectProgress * weight;

    totalWeight += weight;
  });

  if (totalWeight === 0) {
    return 0;
  }

  return Math.round(
    totalWeightedProgress /
      totalWeight
  );
};