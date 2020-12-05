using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Readly.Models
{
    public class Article
    {
        [JsonProperty("time")]
        public double time { get; set; }
        [JsonProperty("blocks")]
        public List<blocks> blocks { get; set; }
        [JsonProperty("version")]
        public string version { get; set; }
    }

    public class blocks
    {
        [JsonProperty("type")]
        public string type { get; set; }
        [JsonProperty("data")]
        public data data { get; set; }
    }

    public class data
    {
        [JsonProperty("text")]
        public string text { get; set; }
        [JsonProperty("level")]
        public int level { get; set; }
    }
}
