define(["jQuery"],function(e){function a(a,t){e("#chkSaveMetadataHidden",a).checked(t.SaveMetadataHidden),e("#txtMetadataPath",a).val(t.MetadataPath||""),e("#chkPeopleActors",a).checked(t.PeopleMetadataOptions.DownloadActorMetadata),e("#chkPeopleComposers",a).checked(t.PeopleMetadataOptions.DownloadComposerMetadata),e("#chkPeopleDirectors",a).checked(t.PeopleMetadataOptions.DownloadDirectorMetadata),e("#chkPeopleProducers",a).checked(t.PeopleMetadataOptions.DownloadProducerMetadata),e("#chkPeopleWriters",a).checked(t.PeopleMetadataOptions.DownloadWriterMetadata),e("#chkPeopleOthers",a).checked(t.PeopleMetadataOptions.DownloadOtherPeopleMetadata),e("#chkPeopleGuestStars",a).checked(t.PeopleMetadataOptions.DownloadGuestStarMetadata),e("#chkDownloadImagesInAdvance",a).checked(t.DownloadImagesInAdvance),Dashboard.hideLoadingMsg()}function t(a,t){e("#selectDateAdded",a).val(t.UseFileCreationTimeForDateAdded?"1":"0")}function n(a,t){e("#chkEnableTmdbUpdates",a).checked(t.EnableAutomaticUpdates)}function o(a,t){e("#chkEnableTvdbUpdates",a).checked(t.EnableAutomaticUpdates)}function i(a,t){e("#chkEnableFanartUpdates",a).checked(t.EnableAutomaticUpdates),e("#txtFanartApiKey",a).val(t.UserApiKey||"")}function d(a,t){e("#chkChaptersMovies",a).checked(t.EnableMovieChapterImageExtraction),e("#chkChaptersEpisodes",a).checked(t.EnableEpisodeChapterImageExtraction),e("#chkChaptersOtherVideos",a).checked(t.EnableOtherVideoChapterImageExtraction),e("#chkExtractChaptersDuringLibraryScan",a).checked(t.ExtractDuringLibraryScan),Dashboard.hideLoadingMsg()}function c(){var e=this;return Dashboard.showLoadingMsg(),l(e),u(e),s(e),p(e),h(e),r(e),!1}function r(a){ApiClient.getNamedConfiguration("fanart").then(function(t){t.EnableAutomaticUpdates=e("#chkEnableFanartUpdates",a).checked(),t.UserApiKey=e("#txtFanartApiKey",a).val(),ApiClient.updateNamedConfiguration("fanart",t)})}function h(a){ApiClient.getNamedConfiguration("tvdb").then(function(t){t.EnableAutomaticUpdates=e("#chkEnableTvdbUpdates",a).checked(),ApiClient.updateNamedConfiguration("tvdb",t)})}function p(a){ApiClient.getNamedConfiguration("themoviedb").then(function(t){t.EnableAutomaticUpdates=e("#chkEnableTmdbUpdates",a).checked(),ApiClient.updateNamedConfiguration("themoviedb",t)})}function l(a){ApiClient.getServerConfiguration().then(function(t){t.SaveMetadataHidden=e("#chkSaveMetadataHidden",a).checked(),t.EnableTvDbUpdates=e("#chkEnableTvdbUpdates",a).checked(),t.EnableTmdbUpdates=e("#chkEnableTmdbUpdates",a).checked(),t.EnableFanArtUpdates=e("#chkEnableFanartUpdates",a).checked(),t.MetadataPath=e("#txtMetadataPath",a).val(),t.FanartApiKey=e("#txtFanartApiKey",a).val(),t.DownloadImagesInAdvance=e("#chkDownloadImagesInAdvance",a).checked(),t.PeopleMetadataOptions.DownloadActorMetadata=e("#chkPeopleActors",a).checked(),t.PeopleMetadataOptions.DownloadComposerMetadata=e("#chkPeopleComposers",a).checked(),t.PeopleMetadataOptions.DownloadDirectorMetadata=e("#chkPeopleDirectors",a).checked(),t.PeopleMetadataOptions.DownloadGuestStarMetadata=e("#chkPeopleGuestStars",a).checked(),t.PeopleMetadataOptions.DownloadProducerMetadata=e("#chkPeopleProducers",a).checked(),t.PeopleMetadataOptions.DownloadWriterMetadata=e("#chkPeopleWriters",a).checked(),t.PeopleMetadataOptions.DownloadOtherPeopleMetadata=e("#chkPeopleOthers",a).checked(),ApiClient.updateServerConfiguration(t).then(Dashboard.processServerConfigurationUpdateResult)})}function s(a){ApiClient.getNamedConfiguration("metadata").then(function(t){t.UseFileCreationTimeForDateAdded="1"==e("#selectDateAdded",a).val(),ApiClient.updateNamedConfiguration("metadata",t)})}function u(a){ApiClient.getNamedConfiguration("chapters").then(function(t){t.EnableMovieChapterImageExtraction=e("#chkChaptersMovies",a).checked(),t.EnableEpisodeChapterImageExtraction=e("#chkChaptersEpisodes",a).checked(),t.EnableOtherVideoChapterImageExtraction=e("#chkChaptersOtherVideos",a).checked(),t.ExtractDuringLibraryScan=e("#chkExtractChaptersDuringLibraryScan",a).checked(),ApiClient.updateNamedConfiguration("chapters",t)})}e(document).on("pageinit","#advancedMetadataConfigurationPage",function(){var a=this;e("#btnSelectMetadataPath",a).on("click.selectDirectory",function(){require(["directorybrowser"],function(t){var n=new t;n.show({callback:function(t){t&&e("#txtMetadataPath",a).val(t),n.close()},header:Globalize.translate("HeaderSelectMetadataPath"),instruction:Globalize.translate("HeaderSelectMetadataPathHelp")})})}),e(".advancedMetadataConfigurationForm").on("submit",c).on("submit",c)}).on("pageshow","#advancedMetadataConfigurationPage",function(){var e=this;ApiClient.getServerConfiguration().then(function(t){a(e,t)}),ApiClient.getNamedConfiguration("metadata").then(function(a){t(e,a)}),ApiClient.getNamedConfiguration("fanart").then(function(a){i(e,a)}),ApiClient.getNamedConfiguration("themoviedb").then(function(a){n(e,a)}),ApiClient.getNamedConfiguration("tvdb").then(function(a){o(e,a)});var c=ApiClient.getNamedConfiguration("chapters"),r=ApiClient.getJSON(ApiClient.getUrl("Providers/Chapters"));Promise.all([c,r]).then(function(a){d(e,a[0],a[1])})})});