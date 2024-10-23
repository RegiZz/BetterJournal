package api.librus.betterjournal

data class TimetableResponse(
    val hours: List<String>,
    val table: Map<String, List<Lesson>>
)

data class Lesson(
    val title: String,
    val hour: String
)